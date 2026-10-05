import assert from 'assert';
import { prisma } from '@/lib/prisma';
import {
  escapeHtml,
  formatFriendlyDate,
  formatFriendlyTime,
  getCustomerEmailTemplates,
  getInternalEmailTemplates,
  dispatchBookingEmails,
  getEmailConfig,
} from '@/lib/email-service';
import { createDemoBooking } from '@/lib/booking-service';

console.log('====================================================');
console.log('GLOWSUITE BOOK A DEMO — PHASE 5 EMAIL TEST SUITE');
console.log('====================================================\n');

const FUTURE_DATE = '2026-12-10';
const FUTURE_TIME = '11:00';
const TEST_MEET_URL = 'https://meet.google.com/test-phase5-meet';
const TEST_REF = 'GLOW-P5TEST';

// Helper to create mock Resend client
function createMockResend(options = {}) {
  const {
    failCustomer = false,
    failInternal = false,
    throwCustomer = false,
    throwInternal = false,
  } = options;

  const sentEmails = [];

  const mock = {
    emails: {
      send: async (payload) => {
        const isCustomer = payload.to === 'client@aurasalon.com';
        if (isCustomer && throwCustomer) {
          throw new Error('Resend network timeout during customer dispatch');
        }
        if (!isCustomer && throwInternal) {
          throw new Error('Resend network timeout during internal dispatch');
        }
        if (isCustomer && failCustomer) {
          return { error: { name: 'validation_error', message: 'Domain not verified' } };
        }
        if (!isCustomer && failInternal) {
          return { error: { name: 'rate_limit', message: 'Too many requests' } };
        }

        const id = `re_mock_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        sentEmails.push({ id, ...payload });
        return { data: { id } };
      },
    },
    _sentEmails: sentEmails,
  };

  return mock;
}

// Helper to create mock Google Calendar client
function createMockCalendar() {
  const deletedEventIds = [];
  return {
    freebusy: {
      query: async () => ({
        data: { calendars: { primary: { busy: [] } } },
      }),
    },
    events: {
      insert: async () => ({
        data: {
          id: `evt_mock_${Date.now()}`,
          hangoutLink: TEST_MEET_URL,
        },
      }),
      delete: async ({ eventId }) => {
        deletedEventIds.push(eventId);
        return { data: {} };
      },
    },
    _deletedEventIds: deletedEventIds,
  };
}

async function checkDbConnection() {
  try {
    const connectPromise = prisma.$queryRaw`SELECT 1 as connected`;
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('PostgreSQL connection timed out (3s)')), 3000)
    );
    await Promise.race([connectPromise, timeoutPromise]);
    return true;
  } catch {
    return false;
  }
}

async function runTests() {
  console.log('--- PART 1: EMAIL TEMPLATE & CONTENT VERIFICATION ---');

  // ---------------------------------------------------------------------
  // Test A: Customer confirmation email content and recipient
  // ---------------------------------------------------------------------
  console.log('\n[Test A] Customer confirmation email content, recipient & structure...');
  const customerData = {
    customerName: 'Meera Nair',
    customerEmail: 'meera@aurasalon.com',
    businessName: 'Aura Luxury Spa',
    date: FUTURE_DATE,
    time: FUTURE_TIME,
    googleMeetUrl: TEST_MEET_URL,
    bookingReference: TEST_REF,
  };

  const customerTemplate = getCustomerEmailTemplates(customerData);

  // Assertions for Test A
  assert(customerTemplate.subject.includes('Confirmed: GlowSuite Product Walkthrough'), 'Subject must indicate confirmation');
  assert(customerTemplate.subject.includes(TEST_REF), 'Subject must include booking reference');
  assert(customerTemplate.html.includes('Meera Nair'), 'HTML must contain customer name');
  assert(customerTemplate.html.includes('Aura Luxury Spa'), 'HTML must contain business name');
  assert(customerTemplate.html.includes(TEST_REF), 'HTML must contain booking reference');
  assert(customerTemplate.html.includes('30 minutes'), 'HTML must state 30 minutes duration');
  assert(customerTemplate.html.includes('Google Meet'), 'HTML must state Google Meet platform');
  assert(customerTemplate.html.includes(TEST_MEET_URL), 'HTML must include real Google Meet URL');
  assert(customerTemplate.html.includes('IST'), 'HTML must state IST timezone');
  assert(customerTemplate.html.includes('#BC269B'), 'HTML must include GlowSuite brand color #BC269B');
  assert(customerTemplate.text.includes(TEST_MEET_URL), 'Plain text must contain Google Meet URL');
  assert(customerTemplate.text.includes('30 minutes'), 'Plain text must state 30 minutes duration');
  assert(customerTemplate.text.includes(TEST_REF), 'Plain text must contain booking reference');
  console.log('  ✓ Customer template contains GlowSuite branding, recipient, IST time, Meet link, and 30-min duration.');

  // ---------------------------------------------------------------------
  // Test B: Internal notification content and recipient
  // ---------------------------------------------------------------------
  console.log('\n[Test B] Internal team notification content & structure...');
  const internalData = {
    customerName: 'Meera Nair',
    customerEmail: 'meera@aurasalon.com',
    customerPhone: '+91 98765 00000',
    businessName: 'Aura Luxury Spa',
    locations: '2–4 Locations',
    notes: 'Looking for POS migration from legacy tool',
    date: FUTURE_DATE,
    time: FUTURE_TIME,
    googleMeetUrl: TEST_MEET_URL,
    bookingReference: TEST_REF,
  };

  const internalTemplate = getInternalEmailTemplates(internalData);

  // Assertions for Test B
  assert(internalTemplate.subject.includes('[New Demo]'), 'Internal subject must indicate new demo');
  assert(internalTemplate.subject.includes('Aura Luxury Spa'), 'Internal subject must include business name');
  assert(internalTemplate.html.includes('Meera Nair'), 'Internal HTML must include contact name');
  assert(internalTemplate.html.includes('meera@aurasalon.com'), 'Internal HTML must include contact email');
  assert(internalTemplate.html.includes('+91 98765 00000'), 'Internal HTML must include contact phone');
  assert(internalTemplate.html.includes('2–4 Locations'), 'Internal HTML must include locations count');
  assert(internalTemplate.html.includes('Looking for POS migration'), 'Internal HTML must include client notes');
  assert(internalTemplate.html.includes(TEST_MEET_URL), 'Internal HTML must include Google Meet link');
  assert(internalTemplate.html.includes(TEST_REF), 'Internal HTML must include booking reference');
  assert(internalTemplate.text.includes('+91 98765 00000'), 'Internal plain text must include phone number');
  assert(internalTemplate.text.includes(TEST_MEET_URL), 'Internal plain text must include Meet link');
  console.log('  ✓ Internal notification includes customer contact info, salon size, client notes, reference, and Meet link.');

  // ---------------------------------------------------------------------
  // Test H: HTML escaping and sensitive-data-safe logging
  // ---------------------------------------------------------------------
  console.log('\n[Test H] HTML escaping & injection prevention...');
  const unsafeName = '<script>alert("xss")</script>';
  const unsafeBusiness = 'Salon & Spa <img src=x onerror=alert(1)> "VIP"';
  const unsafeNotes = '<b>Bold</b> & \'Dangerous\'';

  const escapedName = escapeHtml(unsafeName);
  const escapedBusiness = escapeHtml(unsafeBusiness);
  const escapedNotes = escapeHtml(unsafeNotes);

  assert(!escapedName.includes('<script>'), 'Unsafe script tags must be escaped');
  assert(escapedName.includes('&lt;script&gt;'), 'Script tags must be converted to HTML entities');
  assert(!escapedBusiness.includes('<img'), 'Unsafe img tags must be escaped');
  assert(escapedBusiness.includes('&amp;'), '& must be converted to &amp;');
  assert(escapedBusiness.includes('&quot;'), '" must be converted to &quot;');
  assert(escapedNotes.includes('&#039;'), "' must be converted to &#039;");

  const xssTemplate = getCustomerEmailTemplates({
    customerName: unsafeName,
    customerEmail: 'xss@test.com',
    businessName: unsafeBusiness,
    date: FUTURE_DATE,
    time: FUTURE_TIME,
    googleMeetUrl: TEST_MEET_URL,
    bookingReference: TEST_REF,
  });

  assert(!xssTemplate.html.includes('<script>alert'), 'Customer HTML email must not contain unescaped script tags');
  assert(!xssTemplate.html.includes('<img src=x onerror'), 'Customer HTML email must not contain unescaped img tags');
  console.log('  ✓ All customer-provided content is strictly sanitized and HTML-escaped before insertion.');

  // ---------------------------------------------------------------------
  // Test G: Missing email configuration is handled safely
  // ---------------------------------------------------------------------
  console.log('\n[Test G] Missing email configuration degrades safely...');
  // Force unconfigured environment
  const originalKey = process.env.RESEND_API_KEY;
  const originalFrom = process.env.DEMO_BOOKING_FROM_EMAIL;
  delete process.env.RESEND_API_KEY;
  delete process.env.DEMO_BOOKING_FROM_EMAIL;

  const unconfiguredResult = await dispatchBookingEmails(
    {
      id: 'mock_unconfigured_id',
      date: FUTURE_DATE,
      time: FUTURE_TIME,
      googleMeetUrl: TEST_MEET_URL,
      bookingReference: TEST_REF,
    },
    {
      name: 'Test Unconfigured',
      email: 'unconfigured@example.com',
      salonName: 'Salon Unconfigured',
    }
  );

  assert.strictEqual(unconfiguredResult.customerEmailSent, false, 'Email should not report sent when unconfigured');
  assert.strictEqual(unconfiguredResult.internalEmailSent, false, 'Internal email should not report sent when unconfigured');
  console.log('  ✓ Gracefully skipped email dispatch and returned safe boolean result when credentials missing.');

  // Restore env
  if (originalKey) process.env.RESEND_API_KEY = originalKey;
  if (originalFrom) process.env.DEMO_BOOKING_FROM_EMAIL = originalFrom;

  // ---------------------------------------------------------------------
  // Test E: Independent error handling (customer vs internal)
  // ---------------------------------------------------------------------
  console.log('\n[Test E] Customer email failure does not prevent internal notification (and vice versa)...');
  const mockFailCustomer = createMockResend({ failCustomer: true });
  process.env.DEMO_BOOKING_INTERNAL_EMAIL = 'internal@glowsuite.com';

  const resCustFail = await dispatchBookingEmails(
    {
      id: 'mock_test_e1',
      date: FUTURE_DATE,
      time: FUTURE_TIME,
      googleMeetUrl: TEST_MEET_URL,
      bookingReference: TEST_REF,
    },
    {
      name: 'Client E1',
      email: 'client@aurasalon.com',
      salonName: 'Aura',
    },
    mockFailCustomer
  );

  assert.strictEqual(resCustFail.customerEmailSent, false, 'Customer email must report false on provider failure');
  assert.strictEqual(resCustFail.internalEmailSent, true, 'Internal email must succeed even if customer email failed');

  // Test vice versa: internal fails, customer succeeds
  const mockFailInternal = createMockResend({ failInternal: true });
  const resInternalFail = await dispatchBookingEmails(
    {
      id: 'mock_test_e2',
      date: FUTURE_DATE,
      time: FUTURE_TIME,
      googleMeetUrl: TEST_MEET_URL,
      bookingReference: TEST_REF,
    },
    {
      name: 'Client E2',
      email: 'client@aurasalon.com',
      salonName: 'Aura',
    },
    mockFailInternal
  );

  assert.strictEqual(resInternalFail.customerEmailSent, true, 'Customer email must succeed even if internal email failed');
  assert.strictEqual(resInternalFail.internalEmailSent, false, 'Internal email must report false on provider failure');
  console.log('  ✓ Customer and internal emails execute independently; failure in one does not block the other.');

  // ---------------------------------------------------------------------
  // PART 2: DATABASE & END-TO-END BOOKING ENGINE TESTS
  // ---------------------------------------------------------------------
  console.log('\n--- PART 2: DATABASE & END-TO-END BOOKING INTEGRATION TESTS ---');
  const dbOnline = await checkDbConnection();
  if (!dbOnline) {
    console.log('\n⚠️  PostgreSQL is currently unreachable on 127.0.0.1:5432.');
    console.log('   The SSH tunnel appears closed. To run integration tests C, D, F:');
    console.log('   Run: ssh -N -L 5432:127.0.0.1:5432 root@195.35.6.199\n');
    console.log('====================================================');
    console.log('ALL PHASE 5 EMAIL LOGIC & TEMPLATE TESTS PASSED (A, B, E, G, H) ✓');
    console.log('====================================================');
    return;
  }

  // ---------------------------------------------------------------------
  // Test C: Successful booking with successful email delivery
  // ---------------------------------------------------------------------
  console.log('\n[Test C] End-to-end booking with successful email delivery...');
  const mockCalC = createMockCalendar();
  const mockResendC = createMockResend();

  const bookingC = await createDemoBooking(
    {
      date: FUTURE_DATE,
      time: FUTURE_TIME,
      fullName: 'Rohan Verma',
      businessName: 'Luxe Hair Studio',
      email: 'client@aurasalon.com',
      phone: '+91 91234 56789',
      locations: '1 Location',
      notes: 'Testing Phase 5 integration',
    },
    mockCalC,
    mockResendC
  );

  assert(bookingC.id, 'Booking must be created');
  assert.strictEqual(bookingC.customerEmailSent, true, 'customerEmailSent must be true on successful send');
  assert.strictEqual(mockResendC._sentEmails.length, 2, 'Must have dispatched both customer and internal emails');

  const customerSent = mockResendC._sentEmails.find((e) => e.to === 'client@aurasalon.com');
  assert(customerSent, 'Customer email recipient must match lead email');
  assert(customerSent.subject.includes(bookingC.bookingReference), 'Subject must contain reference');

  const internalSent = mockResendC._sentEmails.find((e) => e.to === 'internal@glowsuite.com');
  assert(internalSent, 'Internal email recipient must match internal config');
  console.log('  ✓ Booking confirmed, customer & internal emails dispatched, customerEmailSent: true returned.');

  // ---------------------------------------------------------------------
  // Test D: Email provider failure does not cancel a confirmed booking
  // ---------------------------------------------------------------------
  console.log('\n[Test D] Email provider network outage does NOT roll back confirmed booking...');
  const mockCalD = createMockCalendar();
  const mockResendD = createMockResend({ throwCustomer: true, throwInternal: true });

  const bookingD = await createDemoBooking(
    {
      date: FUTURE_DATE,
      time: '11:30',
      fullName: 'Vikram Mehta',
      businessName: 'Royal Men Barbershop',
      email: 'client@aurasalon.com',
      phone: '+91 98888 77777',
      locations: '1 Location',
    },
    mockCalD,
    mockResendD
  );

  assert(bookingD.id, 'Booking must be created and confirmed');
  assert(bookingD.googleMeetUrl, 'Google Meet URL must be returned');
  assert(bookingD.bookingReference, 'Booking reference must be returned');
  assert.strictEqual(bookingD.customerEmailSent, false, 'customerEmailSent must be false when provider fails');
  assert.strictEqual(mockCalD._deletedEventIds.length, 0, 'Google Calendar event must NOT be rolled back or deleted');

  // Verify booking exists in database as confirmed
  const dbBookingD = await prisma.demoBooking.findUnique({ where: { id: bookingD.id } });
  assert(dbBookingD, 'Booking must exist in database');
  assert.strictEqual(dbBookingD.status, 'confirmed', 'Booking status must remain confirmed');
  console.log('  ✓ Confirmed booking and Google Calendar event preserved intact despite email provider outage.');

  // ---------------------------------------------------------------------
  // Test F: Idempotent booking retries do not send duplicate emails
  // ---------------------------------------------------------------------
  console.log('\n[Test F] Idempotent booking retry does not trigger duplicate emails...');
  const mockResendF = createMockResend();

  // Re-submit the exact same booking as Test C
  const retryResult = await createDemoBooking(
    {
      date: FUTURE_DATE,
      time: FUTURE_TIME,
      fullName: 'Rohan Verma',
      businessName: 'Luxe Hair Studio',
      email: 'client@aurasalon.com',
      phone: '+91 91234 56789',
    },
    mockCalC,
    mockResendF
  );

  assert.strictEqual(retryResult.id, bookingC.id, 'Retry must return existing booking ID');
  // Since customerEmailSentAt was already set in Test C, mockResendF should receive 0 new sends
  assert.strictEqual(mockResendF._sentEmails.length, 0, 'No duplicate emails must be sent on idempotent retry');
  console.log('  ✓ Idempotent retry detected existing email delivery and safely suppressed duplicate sends.');

  // Clean up test data
  await prisma.demoBooking.deleteMany({ where: { date: FUTURE_DATE } });
  await prisma.demoLead.deleteMany({ where: { email: 'client@aurasalon.com' } });
  console.log('\n✓ Cleaned up test database records.');

  console.log('\n====================================================');
  console.log('ALL 8 PHASE 5 EMAIL TESTS PASSED (A–H) ✓');
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
