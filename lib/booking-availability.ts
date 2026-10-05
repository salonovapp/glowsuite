/**
 * Server-side availability rules & slot calculation for GlowSuite Book a Demo.
 * 
 * Rules:
 * - Timezone: Asia/Kolkata (IST, UTC+05:30)
 * - Booking window: 09:00 AM to 11:00 PM IST (09:00 to 23:00)
 * - Slot duration: 30 minutes
 * - Slot interval: 30 minutes
 * - Start times: 09:00, 09:30, 10:00, ... 22:00, 22:30 (28 slots per day)
 * - 23:00 is window end, not a valid start time
 * - Minimum notice: 2 hours from current time in Asia/Kolkata
 * - Overlap condition: slotStart < busyEnd && slotEnd > busyStart
 */

export interface TimeSlot {
  time: string;        // "09:00"
  label: string;       // "09:00 AM"
  range: string;       // "09:00 AM – 09:30 AM"
  available: boolean;  // true if bookable
  reason?: 'past' | 'notice' | 'busy';
}

export interface BusyInterval {
  start?: string | null;
  end?: string | null;
}

export const BOOKING_TIMEZONE = 'Asia/Kolkata';
export const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000; // +05:30

export const WINDOW_START_HOUR = 9;   // 09:00
export const WINDOW_START_MINUTE = 0;
export const WINDOW_END_HOUR = 23;    // 23:00
export const SLOT_DURATION_MINUTES = 30;
export const MIN_NOTICE_HOURS = 2;

/**
 * Validates whether a string is a strict YYYY-MM-DD calendar date.
 */
export function isValidDateString(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return false;
  }
  const [y, m, d] = dateStr.split('-').map(Number);
  if (m < 1 || m > 12 || d < 1 || d > 31) {
    return false;
  }
  const date = new Date(Date.UTC(y, m - 1, d));
  return (
    date.getUTCFullYear() === y &&
    date.getUTCMonth() === m - 1 &&
    date.getUTCDate() === d
  );
}

/**
 * Formats hour and minute into a 12-hour string (e.g. 9, 0 -> "09:00 AM", 13, 30 -> "01:30 PM")
 */
function format12Hour(hour: number, minute: number): string {
  const period = hour >= 12 ? 'PM' : 'AM';
  let h12 = hour % 12;
  if (h12 === 0) h12 = 12;
  const padH = String(h12).padStart(2, '0');
  const padM = String(minute).padStart(2, '0');
  return `${padH}:${padM} ${period}`;
}

/**
 * Generates all daily 30-minute slots between 09:00 and 23:00 IST for a given date,
 * checking against minimum notice and Google Calendar busy periods.
 */
export function calculateAvailabilitySlots(
  dateStr: string,
  busyIntervals: BusyInterval[] = [],
  currentTimeMs: number = Date.now()
): TimeSlot[] {
  if (!isValidDateString(dateStr)) {
    throw new Error(`Invalid date format: ${dateStr}. Expected YYYY-MM-DD.`);
  }

  // Parse busy intervals into epoch ms
  const parsedBusy = busyIntervals
    .map((b) => {
      const startMs = b.start ? Date.parse(b.start) : NaN;
      const endMs = b.end ? Date.parse(b.end) : NaN;
      return { startMs, endMs };
    })
    .filter((b) => !isNaN(b.startMs) && !isNaN(b.endMs));

  const minNoticeMs = currentTimeMs + MIN_NOTICE_HOURS * 60 * 60 * 1000;
  const slots: TimeSlot[] = [];

  // Generate slots from 09:00 to 22:30 (last slot ends at 23:00)
  let currentMinutes = WINDOW_START_HOUR * 60 + WINDOW_START_MINUTE;
  const endMinutes = WINDOW_END_HOUR * 60; // 23 * 60 = 1380

  while (currentMinutes + SLOT_DURATION_MINUTES <= endMinutes) {
    const startHour = Math.floor(currentMinutes / 60);
    const startMin = currentMinutes % 60;
    const endMinutesOfSlot = currentMinutes + SLOT_DURATION_MINUTES;
    const endHour = Math.floor(endMinutesOfSlot / 60);
    const endMin = endMinutesOfSlot % 60;

    const padH = String(startHour).padStart(2, '0');
    const padM = String(startMin).padStart(2, '0');
    const time24 = `${padH}:${padM}`;

    const label = format12Hour(startHour, startMin);
    const endLabel = format12Hour(endHour, endMin);
    const range = `${label} – ${endLabel}`;

    // Parse exact slot start/end in Asia/Kolkata (+05:30)
    const slotStartIso = `${dateStr}T${padH}:${padM}:00+05:30`;
    const slotStartMs = Date.parse(slotStartIso);
    const slotEndMs = slotStartMs + SLOT_DURATION_MINUTES * 60 * 1000;

    let available = true;
    let reason: 'past' | 'notice' | 'busy' | undefined;

    // 1. Minimum notice / past time check
    if (slotStartMs < currentTimeMs) {
      available = false;
      reason = 'past';
    } else if (slotStartMs < minNoticeMs) {
      available = false;
      reason = 'notice';
    }

    // 2. Google Calendar overlap check: slotStart < busyEnd && slotEnd > busyStart
    if (available) {
      const isBusy = parsedBusy.some(
        (b) => slotStartMs < b.endMs && slotEndMs > b.startMs
      );
      if (isBusy) {
        available = false;
        reason = 'busy';
      }
    }

    slots.push({
      time: time24,
      label,
      range,
      available,
      ...(reason ? { reason } : {}),
    });

    currentMinutes += SLOT_DURATION_MINUTES;
  }

  return slots;
}
