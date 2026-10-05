import assert from 'assert';
import { prisma } from '../lib/prisma.ts';
import {
  createDemoBooking,
  isValidSlotTime,
  normalizeSlotTime,
  calculateSlotEndIso,
  BookingValidationError,
  BookingConflictError,
  CalendarServiceError,
} from '../lib/booking-service.ts';

console.log('====================================================');
console.log('GLOWSUITE BOOK A DEMO — PHASE 4 BOOKING TEST SUITE');
console.log('====================================================\n');

// Use a future date (well beyond 2h notice) for tests
const FUTURE_DATE = '2026-11-20';
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'primary';

// Helper to create mock Google Calendar client
function createMockCalendar(options = {}) {
  const {
    busyIntervals = [],
    insertFail = false,
    freeBusyFail = false,
    meetUrl = 'https://meet.google.com/test-abc-xyz',
    omitMeet = false,
  } = options;

  const deletedEventIds = [];
  const insertedEvents = [];

  const mock = {
    freebusy: {
      query: async ({ requestBody }) => {
        if (freeBusyFail) throw new Error('Mock Google API network outage');
        return {
          data: {
            calendars: {
              [CALENDAR_ID]: {
                busy: busyIntervals,
              },
            },
          },
        };
      },
    },
    events: {
      insert: async ({ requestBody }) => {
        if (insertFail) throw new Error('Mock Google Insert failure');
        const id = `evt_mock_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        insertedEvents.push({ id, requestBody });
        return {
          data: {
            id,
            hangoutLink: omitMeet ? null : meetUrl,
            conferenceData: omitMeet
              ? { createRequest: { status: { statusCode: 'failed' } } }
              : {
                  entryPoints: [
                    { entryPointType: 'video', uri: meetUrl },
                  ],
                },
          },
        };
      },
      get: async () => ({
        data: {
          hangoutLink: omitMeet ? null : meetUrl,
        },
      }),
      delete: async ({ eventId }) => {
        deletedEventIds.push(eventId);
        return { data: {} };
      },
    },
    _deletedEventIds: deletedEventIds,
    _insertedEvents: insertedEvents,
  };

  return mock;
}

async function checkDbConnection() {
  try {
    const connectPromise = prisma.$queryRaw`SELECT 1 as connected`;
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('PostgreSQL connection timed out (5s)')), 5000)
    );
    await Promise.race([connectPromise, timeoutPromise]);
    return true;
  } catch {
    return false;
  }
}

async function runTests() {
  console.log('--- PART 1: VALIDATION & UNIT LOGIC TESTS (No DB required) ---');

  // ---------------------------------------------------------------------
  // Test B: Invalid date rejection (400)
  // ---------------------------------------------------------------------
  console.log('\n[Test B] Invalid date rejection (400)...');
  for (const badDate of ['2026-02-31', 'invalid-date', '2026/10/10', '']) {
    let errCaught = null;
    try {
      await createDemoBooking({
        date: badDate,
        time: '10:00',
        fullName: 'Test User',
        businessName: 'Salon',
        email: 'test@example.com',
        phone: '1234567890',
      });
    } catch (e) {
      errCaught = e;
    }
    assert(errCaught instanceof BookingValidationError, `Date "${badDate}" must throw BookingValidationError`);
  }
  console.log('  ✓ Invalid dates correctly rejected with BookingValidationError (400).');

  // ---------------------------------------------------------------------
  // Test C: Invalid time rejection (400)
  // ---------------------------------------------------------------------
  console.log('\n[Test C] Invalid time rejection (400)...');
  for (const badTime of ['09:15', '23:00', '23:30', '08:30', 'random', '']) {
    let errCaught = null;
    try {
      await createDemoBooking({
        date: FUTURE_DATE,
        time: badTime,
        fullName: 'Test User',
        businessName: 'Salon',
        email: 'test@example.com',
        phone: '1234567890',
      });
    } catch (e) {
      errCaught = e;
    }
    assert(errCaught instanceof BookingValidationError, `Time "${badTime}" must throw BookingValidationError`);
  }
  console.log('  ✓ Invalid appointment times correctly rejected with BookingValidationError (400).');

  // ---------------------------------------------------------------------
  // Test D: Past date/time rejection (400)
  // ---------------------------------------------------------------------
  console.log('\n[Test D] Past date rejection (400)...');
  let pastErr = null;
  try {
    await createDemoBooking({
      date: '2020-01-01',
      time: '10:00',
      fullName: 'Test Past',
      businessName: 'Salon',
      email: 'past@example.com',
      phone: '1234567890',
    });
  } catch (e) {
    pastErr = e;
  }
  assert(pastErr instanceof BookingValidationError, 'Past date must throw BookingValidationError');
  assert(pastErr.message.includes('past'), 'Error message must mention past date');
  console.log('  ✓ Past dates correctly rejected.');

  // ---------------------------------------------------------------------
  // Test E: Less than 2 hours notice rejection (400)
  // ---------------------------------------------------------------------
  console.log('\n[Test E] Less than 2 hours notice rejection (400)...');
  const nowMs = Date.now();
  const soonDate = new Date(nowMs + 30 * 60 * 1000);
  const istDate = new Date(soonDate.getTime() + 5.5 * 60 * 60 * 1000);
  const istYear = istDate.getUTCFullYear();
  const istMonth = String(istDate.getUTCMonth() + 1).padStart(2, '0');
  const istDay = String(istDate.getUTCDate()).padStart(2, '0');
  const istHour = String(istDate.getUTCHours()).padStart(2, '0');
  const istMinute = istDate.getUTCMinutes() < 30 ? '00' : '30';
  const soonDateStr = `${istYear}-${istMonth}-${istDay}`;
  const soonTimeStr = `${istHour}:${istMinute}`;

  let noticeErr = null;
  try {
    await createDemoBooking({
      date: soonDateStr,
      time: soonTimeStr,
      fullName: 'Test Short Notice',
      businessName: 'Salon',
      email: 'notice@example.com',
      phone: '1234567890',
    });
  } catch (e) {
    noticeErr = e;
  }
  assert(noticeErr instanceof BookingValidationError, 'Under 2 hours notice must throw BookingValidationError');
  console.log('  ✓ Notice under 2 hours correctly rejected.');

  // ---------------------------------------------------------------------
  // Test L: Frontend response structure and normalization
  // ---------------------------------------------------------------------
  console.log('\n[Test L] Normalization and response contract for UI...');
  assert.strictEqual(normalizeSlotTime('09:00'), '09:00');
  assert.strictEqual(normalizeSlotTime('09:00 AM'), '09:00');
  assert.strictEqual(normalizeSlotTime('09:00 AM – 09:30 AM'), '09:00');
  assert.strictEqual(normalizeSlotTime('02:30 PM'), '14:30');
  assert.strictEqual(normalizeSlotTime('02:30 PM – 03:00 PM'), '14:30');
  assert.strictEqual(isValidSlotTime('09:00 AM – 09:30 AM'), true);
  assert.strictEqual(isValidSlotTime('10:30 PM – 11:00 PM'), true);
  assert.strictEqual(isValidSlotTime('11:00 PM – 11:30 PM'), false);
  console.log('  ✓ Time string normalization and slot range validation verified.');

  console.log('\n--- PART 2: DATABASE & CONCURRENCY INTEGRATION TESTS ---');
  const dbOnline = await checkDbConnection();
  if (!dbOnline) {
    console.log('\n⚠️  PostgreSQL is currently unreachable on 127.0.0.1:5432.');
    console.log('   The SSH tunnel appears closed. To run integration tests A, F, G, H, I, J, K:');
    console.log('   Run: ssh -N -L 5432:127.0.0.1:5432 root@195.35.6.199\n');
    console.log('====================================================');
    console.log('ALL UNIT & SPECIFICATION TESTS PASSED (B, C, D, E, L) ✓');
    console.log('====================================================');
    return;
  }

  // Check baseline demo_leads count (should be 7)
  const initialLeads = await prisma.demoLead.findMany({ orderBy: { id: 'asc' } });
  console.log(`[Baseline Check] Found ${initialLeads.length} existing demo_leads in database.`);
  assert(initialLeads.length >= 7, 'Existing demo_leads must contain at least the 7 historical records');

  // ---------------------------------------------------------------------
  // Test A: Valid booking creation with mocked Calendar & Meet URL
  // ---------------------------------------------------------------------
  console.log('\n[Test A] Valid booking creation with mocked Calendar & Meet URL...');
  const mockA = createMockCalendar();
  const bookingA = await createDemoBooking(
    {
      date: FUTURE_DATE,
      time: '10:00',
      fullName: 'Anita Sharma',
      businessName: 'Glow Luxury Lounge',
      email: 'anita@glowluxurylounge.in',
      phone: '+91 98765 43210',
      locations: '2–4 Locations',
      notes: 'Interested in inventory & stylist payroll',
    },
    mockA
  );

  assert(bookingA.id, 'Booking must have an id');
  assert(bookingA.leadId, 'Booking must be linked to a leadId');
  assert.strictEqual(bookingA.date, FUTURE_DATE);
  assert.strictEqual(bookingA.time, '10:00');
  assert.strictEqual(bookingA.timezone, 'Asia/Kolkata');
  assert.strictEqual(bookingA.googleMeetUrl, 'https://meet.google.com/test-abc-xyz');
  assert(bookingA.bookingReference.startsWith('GLOW-'), 'Reference must start with GLOW-');

  // Verify in PostgreSQL
  const dbBookingA = await prisma.demoBooking.findUnique({ where: { id: bookingA.id } });
  assert(dbBookingA, 'Booking record must exist in demo_bookings');
  assert.strictEqual(dbBookingA.status, 'confirmed');

  const dbLeadA = await prisma.demoLead.findUnique({ where: { id: BigInt(bookingA.leadId) } });
  assert(dbLeadA, 'Lead record must exist in demo_leads');
  assert.strictEqual(dbLeadA.status, 'booked');
  assert.strictEqual(dbLeadA.email, 'anita@glowluxurylounge.in');
  console.log('  ✓ Valid booking created, persisted to demo_leads & demo_bookings, returned valid Meet URL & reference.');



  // ---------------------------------------------------------------------
  // Test F: Busy slot conflict rejection (409)
  // ---------------------------------------------------------------------
  console.log('\n[Test F] Google Calendar busy slot conflict rejection (409)...');
  const mockBusy = createMockCalendar({
    busyIntervals: [
      {
        start: `${FUTURE_DATE}T14:00:00+05:30`,
        end: `${FUTURE_DATE}T14:30:00+05:30`,
      },
    ],
  });

  let conflictErr = null;
  try {
    await createDemoBooking(
      {
        date: FUTURE_DATE,
        time: '14:00',
        fullName: 'Busy Tester',
        businessName: 'Busy Salon',
        email: 'busy@example.com',
        phone: '1234567890',
      },
      mockBusy
    );
  } catch (e) {
    conflictErr = e;
  }
  assert(conflictErr instanceof BookingConflictError, 'Busy slot must throw BookingConflictError');
  assert.strictEqual(conflictErr.statusCode, 409);
  console.log('  ✓ Busy slot on Google Calendar rejected with BookingConflictError (409).');

  // ---------------------------------------------------------------------
  // Test G: Database slot conflict rejection (409)
  // ---------------------------------------------------------------------
  console.log('\n[Test G] Database duplicate slot conflict rejection (409)...');
  let duplicateSlotErr = null;
  try {
    // 10:00 was already booked in Test A
    await createDemoBooking(
      {
        date: FUTURE_DATE,
        time: '10:00',
        fullName: 'Second Customer',
        businessName: 'Another Salon',
        email: 'second@example.com',
        phone: '1234567890',
      },
      createMockCalendar()
    );
  } catch (e) {
    duplicateSlotErr = e;
  }
  assert(duplicateSlotErr instanceof BookingConflictError, 'Existing booked slot must throw BookingConflictError');
  console.log('  ✓ Slot already booked in DB rejected with BookingConflictError (409).');

  // ---------------------------------------------------------------------
  // Test H: Duplicate idempotent request returns existing booking
  // ---------------------------------------------------------------------
  console.log('\n[Test H] Idempotent retry returns existing booking...');
  const idempotentRes = await createDemoBooking(
    {
      date: FUTURE_DATE,
      time: '10:00',
      fullName: 'Anita Sharma',
      businessName: 'Glow Luxury Lounge',
      email: 'anita@glowluxurylounge.in',
      phone: '+91 98765 43210',
    },
    createMockCalendar()
  );
  assert.strictEqual(idempotentRes.id, bookingA.id, 'Idempotent request must return original booking ID');
  assert.strictEqual(idempotentRes.googleMeetUrl, bookingA.googleMeetUrl);
  console.log('  ✓ Idempotent submission safely returned existing confirmed booking.');

  // ---------------------------------------------------------------------
  // Test I: Calendar API failure returns safe 503
  // ---------------------------------------------------------------------
  console.log('\n[Test I] Calendar API failure returns safe 503...');
  const mockApiFail = createMockCalendar({ freeBusyFail: true });
  let serviceErr = null;
  try {
    await createDemoBooking(
      {
        date: FUTURE_DATE,
        time: '15:00',
        fullName: 'Down Test',
        businessName: 'Down Salon',
        email: 'down@example.com',
        phone: '1234567890',
      },
      mockApiFail
    );
  } catch (e) {
    serviceErr = e;
  }
  assert(serviceErr instanceof CalendarServiceError, 'Calendar outage must throw CalendarServiceError');
  assert.strictEqual(serviceErr.statusCode, 503);
  console.log('  ✓ Google Calendar API outage correctly returns CalendarServiceError (503).');

  // ---------------------------------------------------------------------
  // Test J: Meet creation failure initiates rollback without orphan events
  // ---------------------------------------------------------------------
  console.log('\n[Test J] Meet creation failure rolls back Google event and DB...');
  const mockMeetFail = createMockCalendar({ omitMeet: true });
  let meetErr = null;
  try {
    await createDemoBooking(
      {
        date: FUTURE_DATE,
        time: '16:00',
        fullName: 'No Meet Test',
        businessName: 'No Meet Salon',
        email: 'nomeet@example.com',
        phone: '1234567890',
      },
      mockMeetFail
    );
  } catch (e) {
    meetErr = e;
  }
  assert(meetErr instanceof CalendarServiceError, 'Missing Meet link must throw CalendarServiceError');
  assert.strictEqual(mockMeetFail._deletedEventIds.length, 1, 'Orphan Google Calendar event must be deleted');

  // Verify no booking was created in DB for 16:00
  const orphanBooking = await prisma.demoBooking.findUnique({
    where: { date_time: { date: FUTURE_DATE, time: '16:00' } },
  });
  assert(!orphanBooking, 'No booking record must remain in database after rollback');
  console.log('  ✓ Missing Meet link rolled back event delete and left no orphan DB records.');

  // ---------------------------------------------------------------------
  // Test K: Existing demo_leads records verified untouched
  // ---------------------------------------------------------------------
  console.log('\n[Test K] Verifying existing demo_leads records are untouched...');
  const currentLeads = await prisma.demoLead.findMany({ orderBy: { id: 'asc' } });
  for (let i = 0; i < 7; i++) {
    const orig = initialLeads[i];
    const curr = currentLeads[i];
    assert.strictEqual(curr.id.toString(), orig.id.toString(), `Lead ${orig.id} ID must match`);
    assert.strictEqual(curr.name, orig.name, `Lead ${orig.id} name must match`);
    assert.strictEqual(curr.email, orig.email, `Lead ${orig.id} email must match`);
    assert.strictEqual(curr.phone, orig.phone, `Lead ${orig.id} phone must match`);
    assert.strictEqual(curr.salon_name, orig.salon_name, `Lead ${orig.id} salon_name must match`);
  }
  console.log('  ✓ Confirmed all original demo_leads historical rows (1 through 7) are untouched.');

  // ---------------------------------------------------------------------
  // Test L: Frontend response structure and normalization
  // ---------------------------------------------------------------------
  console.log('\n[Test L] Normalization and response contract for UI...');
  assert.strictEqual(normalizeSlotTime('09:00'), '09:00');
  assert.strictEqual(normalizeSlotTime('09:00 AM'), '09:00');
  assert.strictEqual(normalizeSlotTime('09:00 AM – 09:30 AM'), '09:00');
  assert.strictEqual(normalizeSlotTime('02:30 PM'), '14:30');
  assert.strictEqual(normalizeSlotTime('02:30 PM – 03:00 PM'), '14:30');
  assert.strictEqual(isValidSlotTime('09:00 AM – 09:30 AM'), true);
  assert.strictEqual(isValidSlotTime('10:30 PM – 11:00 PM'), true);
  assert.strictEqual(isValidSlotTime('11:00 PM – 11:30 PM'), false);
  console.log('  ✓ Time string normalization and slot range validation verified.');

  // Clean up Test A test data so database stays pristine
  await prisma.demoBooking.deleteMany({ where: { date: FUTURE_DATE } });
  await prisma.demoLead.deleteMany({ where: { email: 'anita@glowluxurylounge.in' } });
  console.log('\n✓ Test data cleaned up successfully.');

  console.log('\n====================================================');
  console.log('ALL 12 PHASE 4 BOOKING TESTS PASSED (A–L) ✓');
  console.log('====================================================');
}

runTests()
  .catch((err) => {
    console.error('\n❌ Test suite failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
