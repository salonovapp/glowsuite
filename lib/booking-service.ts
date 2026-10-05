import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import {
  BOOKING_TIMEZONE,
  isValidDateString,
  MIN_NOTICE_HOURS,
  WINDOW_START_HOUR,
  WINDOW_END_HOUR,
  SLOT_DURATION_MINUTES,
} from '@/lib/booking-availability';
import {
  getGoogleCalendarClient,
  getGoogleCalendarId,
} from '@/lib/google-calendar';

export class BookingValidationError extends Error {
  statusCode = 400;
  constructor(message: string) {
    super(message);
    this.name = 'BookingValidationError';
  }
}

export class BookingConflictError extends Error {
  statusCode = 409;
  constructor(message: string) {
    super(message);
    this.name = 'BookingConflictError';
  }
}

export class CalendarServiceError extends Error {
  statusCode = 503;
  constructor(message: string) {
    super(message);
    this.name = 'CalendarServiceError';
  }
}

export interface CreateBookingInput {
  date: string;
  time: string;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  locations?: string;
  notes?: string;
  idempotencyKey?: string;
}

import { dispatchBookingEmails } from '@/lib/email-service';

export interface BookingResult {
  id: string;
  leadId: string;
  date: string;
  time: string;
  timezone: string;
  googleMeetUrl: string;
  bookingReference: string;
  customerEmailSent?: boolean;
}

/**
 * Normalizes input time string into 24-hr "HH:mm".
 * Handles: "09:00", "09:00 AM", "09:00 AM – 09:30 AM", "14:30", "02:30 PM", etc.
 */
export function normalizeSlotTime(timeStr: string): string | null {
  if (!timeStr) return null;
  const trimmed = timeStr.trim();
  if (/^\d{2}:\d{2}$/.test(trimmed)) return trimmed;

  const match12 = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (match12) {
    let h = parseInt(match12[1], 10);
    const m = match12[2];
    const period = match12[3].toUpperCase();
    if (period === 'PM' && h < 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;
    return `${String(h).padStart(2, '0')}:${m}`;
  }
  return null;
}

/**
 * Validates slot time against allowed 30-min start times (09:00 to 22:30).
 */
export function isValidSlotTime(timeStr: string): boolean {
  const normalized = normalizeSlotTime(timeStr);
  if (!normalized) return false;
  const [h, m] = normalized.split(':').map(Number);
  if (m !== 0 && m !== 30) return false;
  const totalMinutes = h * 60 + m;
  const startMinutes = WINDOW_START_HOUR * 60; // 09:00 = 540
  const endMinutes = WINDOW_END_HOUR * 60;     // 23:00 = 1380
  // Last valid start time is 22:30 (1350)
  return totalMinutes >= startMinutes && totalMinutes + SLOT_DURATION_MINUTES <= endMinutes;
}

/**
 * Formats slotEnd string in ISO format for Asia/Kolkata (+05:30)
 */
export function calculateSlotEndIso(dateStr: string, timeStr: string): { slotStartIso: string; slotEndIso: string; slotStartMs: number; slotEndMs: number } {
  const [h, m] = timeStr.split(':').map(Number);
  const slotStartIso = `${dateStr}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00+05:30`;
  const slotStartMs = Date.parse(slotStartIso);
  const slotEndMs = slotStartMs + SLOT_DURATION_MINUTES * 60 * 1000;

  const endTotalMinutes = h * 60 + m + SLOT_DURATION_MINUTES;
  const endH = Math.floor(endTotalMinutes / 60);
  const endM = endTotalMinutes % 60;
  const slotEndIso = `${dateStr}T${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}:00+05:30`;

  return { slotStartIso, slotEndIso, slotStartMs, slotEndMs };
}

/**
 * Creates a real Google Calendar demo booking with Google Meet conference,
 * enforcing advisory locking, live FreeBusy checks, and database persistence.
 */
export async function createDemoBooking(
  input: CreateBookingInput,
  calendarClientOverride?: any, // Used for unit tests
  emailClientOverride?: any     // Used for unit tests
): Promise<BookingResult> {
  const date = input.date?.trim();
  const time = input.time?.trim();
  const fullName = input.fullName?.trim();
  const businessName = input.businessName?.trim();
  const email = input.email?.trim().toLowerCase();
  const phone = input.phone?.trim();
  const locations = input.locations?.trim() || '1 Location';
  const notes = input.notes?.trim() || '';

  // 1. Strict Input Validation
  if (!date || !isValidDateString(date)) {
    throw new BookingValidationError('Please select a valid date in YYYY-MM-DD format.');
  }
  const normalizedTime = normalizeSlotTime(time || '');
  if (!normalizedTime || !isValidSlotTime(normalizedTime)) {
    throw new BookingValidationError('Invalid appointment time. Times must be on the half hour between 09:00 and 22:30 IST.');
  }
  if (!fullName || fullName.length < 2) {
    throw new BookingValidationError('Please enter a valid full name.');
  }
  if (!businessName || businessName.length < 2) {
    throw new BookingValidationError('Please enter your salon or studio name.');
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new BookingValidationError('Please provide a valid work email address.');
  }
  if (!phone || phone.length < 8) {
    throw new BookingValidationError('Please provide a valid contact number.');
  }

  const { slotStartIso, slotEndIso, slotStartMs, slotEndMs } = calculateSlotEndIso(date, normalizedTime);
  const now = Date.now();

  // 2. Minimum Notice Check (2 hours in Asia/Kolkata)
  if (slotStartMs < now) {
    throw new BookingValidationError('Cannot book appointments in the past.');
  }
  const minNoticeMs = now + MIN_NOTICE_HOURS * 60 * 60 * 1000;
  if (slotStartMs < minNoticeMs) {
    throw new BookingValidationError('Bookings require at least 2 hours advance notice.');
  }

  // 3. Idempotency Check
  const idempotencyKey = input.idempotencyKey?.trim() || `idem_${crypto.createHash('sha256').update(`${email}:${date}:${normalizedTime}`).digest('hex').slice(0, 32)}`;
  const existingIdempotent = await prisma.demoBooking.findUnique({
    where: { idempotencyKey },
  });

  if (existingIdempotent && existingIdempotent.status === 'confirmed') {
    let customerEmailSent = Boolean(existingIdempotent.customerEmailSentAt);
    if (!existingIdempotent.customerEmailSentAt || !existingIdempotent.internalEmailSentAt) {
      try {
        const emailDispatch = await dispatchBookingEmails(
          {
            id: existingIdempotent.id,
            date: existingIdempotent.date,
            time: existingIdempotent.time,
            googleMeetUrl: existingIdempotent.googleMeetUrl,
            bookingReference: `GLOW-${existingIdempotent.id.slice(-6).toUpperCase()}`,
            customerEmailSentAt: existingIdempotent.customerEmailSentAt,
            internalEmailSentAt: existingIdempotent.internalEmailSentAt,
          },
          {
            name: fullName,
            email,
            phone,
            salonName: businessName,
            locations,
            notes,
          },
          emailClientOverride
        );
        customerEmailSent = customerEmailSent || emailDispatch.customerEmailSent;
      } catch {}
    }

    return {
      id: existingIdempotent.id,
      leadId: existingIdempotent.leadId ? existingIdempotent.leadId.toString() : '',
      date: existingIdempotent.date,
      time: existingIdempotent.time,
      timezone: BOOKING_TIMEZONE,
      googleMeetUrl: existingIdempotent.googleMeetUrl,
      bookingReference: `GLOW-${existingIdempotent.id.slice(-6).toUpperCase()}`,
      customerEmailSent,
    };
  }

  // 4. Calendar Credentials & Client
  let calendar;
  let calendarId: string;
  try {
    calendar = calendarClientOverride || (await getGoogleCalendarClient());
    calendarId = getGoogleCalendarId();
  } catch {
    throw new CalendarServiceError('Calendar service is currently unavailable. Please try again shortly.');
  }

  // 5. Concurrency Control: PostgreSQL Advisory Lock on (calendarId + date + time)
  const lockSeed = `glowsuite_booking:${calendarId}:${date}:${normalizedTime}`;
  const lockKey = crypto.createHash('sha256').update(lockSeed).digest().readInt32BE(0);

  const lockRows = await prisma.$queryRaw<Array<{ pg_try_advisory_lock: boolean }>>`
    SELECT pg_try_advisory_lock(${lockKey})
  `;
  const lockAcquired = Boolean(lockRows[0]?.pg_try_advisory_lock);

  if (!lockAcquired) {
    throw new BookingConflictError('This time slot is currently being reserved by another customer. Please choose another time.');
  }

  let createdGoogleEventId: string | null = null;
  let createdBooking: BookingResult | null = null;

  try {
    // 6. Double-check database for existing confirmed booking for this exact slot
    const existingSlot = await prisma.demoBooking.findUnique({
      where: { date_time: { date, time: normalizedTime } },
    });
    if (existingSlot && existingSlot.status === 'confirmed') {
      throw new BookingConflictError('This time slot is no longer available. Please select another time.');
    }

    // 7. FreeBusy Re-check on Google Calendar
    try {
      const freeBusyRes = await calendar.freebusy.query({
        requestBody: {
          timeMin: slotStartIso,
          timeMax: slotEndIso,
          timeZone: BOOKING_TIMEZONE,
          items: [{ id: calendarId }],
        },
      });

      const busyList = freeBusyRes.data?.calendars?.[calendarId]?.busy || [];
      const hasConflict = busyList.some((b: any) => {
        const bStart = Date.parse(b.start!);
        const bEnd = Date.parse(b.end!);
        return slotStartMs < bEnd && slotEndMs > bStart;
      });

      if (hasConflict) {
        throw new BookingConflictError('This time slot was just booked on the calendar. Please select another time.');
      }
    } catch (err: any) {
      if (err instanceof BookingConflictError) throw err;
      throw new CalendarServiceError('Unable to verify real-time calendar availability.');
    }

    // 8. Create Google Calendar Event with Google Meet conferenceData
    const conferenceRequestId = `conf_${crypto.randomUUID()}`;
    const eventBody = {
      summary: `GlowSuite Demo — ${businessName} (${fullName})`,
      description: `GlowSuite 30-Minute Personalized Product Walkthrough\n\nContact: ${fullName}\nSalon/Business: ${businessName}\nEmail: ${email}\nPhone: ${phone}\nLocations: ${locations}${notes ? `\n\nNotes from client:\n${notes}` : ''}`,
      start: {
        dateTime: slotStartIso,
        timeZone: BOOKING_TIMEZONE,
      },
      end: {
        dateTime: slotEndIso,
        timeZone: BOOKING_TIMEZONE,
      },
      conferenceData: {
        createRequest: {
          requestId: conferenceRequestId,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    };

    let eventRes;
    try {
      eventRes = await calendar.events.insert({
        calendarId,
        conferenceDataVersion: 1,
        requestBody: eventBody,
      });
      createdGoogleEventId = eventRes.data?.id || null;
    } catch {
      throw new CalendarServiceError('Failed to create calendar event on Google Calendar.');
    }

    if (!createdGoogleEventId) {
      throw new CalendarServiceError('Google Calendar did not return a valid event identifier.');
    }

    // 9. Extract and Poll for Google Meet Video URL
    let googleMeetUrl =
      eventRes.data?.hangoutLink ||
      eventRes.data?.conferenceData?.entryPoints?.find((ep: any) => ep.entryPointType === 'video')?.uri;

    if (!googleMeetUrl && eventRes.data?.conferenceData?.createRequest?.status?.statusCode === 'pending') {
      for (let attempt = 0; attempt < 3; attempt++) {
        await new Promise((r) => setTimeout(r, 600));
        const updated = await calendar.events.get({
          calendarId,
          eventId: createdGoogleEventId,
          conferenceDataVersion: 1,
        });
        googleMeetUrl =
          updated.data?.hangoutLink ||
          updated.data?.conferenceData?.entryPoints?.find((ep: any) => ep.entryPointType === 'video')?.uri;
        if (googleMeetUrl) break;
      }
    }

    if (!googleMeetUrl) {
      // Rollback: delete orphan event
      try {
        await calendar.events.delete({ calendarId, eventId: createdGoogleEventId });
      } catch {}
      createdGoogleEventId = null;
      throw new CalendarServiceError('Google Calendar created the event but could not generate a Google Meet video conference link.');
    }

    // 10. Database Persistence (Transaction for DemoLead + DemoBooking)
    const result = await prisma.$transaction(async (tx) => {
      const lead = await tx.demoLead.create({
        data: {
          name: fullName,
          email,
          phone,
          salon_name: businessName,
          state: 'N/A',
          district: 'N/A',
          status: 'booked',
          notes: `Locations: ${locations}${notes ? `\n\nNotes: ${notes}` : ''}`,
        },
      });

      const booking = await tx.demoBooking.create({
        data: {
          leadId: lead.id,
          date,
          time: normalizedTime,
          slotStart: new Date(slotStartMs),
          slotEnd: new Date(slotEndMs),
          googleEventId: createdGoogleEventId!,
          googleMeetUrl: googleMeetUrl!,
          idempotencyKey,
          status: 'confirmed',
        },
      });

      return {
        id: booking.id,
        leadId: lead.id.toString(),
        date: booking.date,
        time: booking.time,
        timezone: BOOKING_TIMEZONE,
        googleMeetUrl: booking.googleMeetUrl,
        bookingReference: `GLOW-${booking.id.slice(-6).toUpperCase()}`,
      };
    });

    createdBooking = result;
  } catch (err) {
    // Rollback Google Calendar event if database persistence failed after event was created
    if (createdGoogleEventId) {
      try {
        await calendar.events.delete({ calendarId, eventId: createdGoogleEventId });
      } catch {}
    }
    throw err;
  } finally {
    // 11. Release Advisory Lock
    try {
      await prisma.$queryRaw`SELECT pg_advisory_unlock(${lockKey})`;
    } catch {}
  }

  // 12. Dispatch Transactional Emails (Decoupled, Post-Commit, Zero Lock Holding)
  let customerEmailSent = false;
  if (createdBooking) {
    try {
      const emailResult = await dispatchBookingEmails(
        {
          id: createdBooking.id,
          date: createdBooking.date,
          time: createdBooking.time,
          googleMeetUrl: createdBooking.googleMeetUrl,
          bookingReference: createdBooking.bookingReference,
        },
        {
          name: fullName,
          email,
          phone,
          salonName: businessName,
          locations,
          notes,
        },
        emailClientOverride
      );
      customerEmailSent = emailResult.customerEmailSent;
    } catch {
      // Safe: never fail booking creation due to email dispatch issue
    }
  }

  return {
    ...createdBooking!,
    customerEmailSent,
  };
}
