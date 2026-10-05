import assert from 'assert';
import {
  calculateAvailabilitySlots,
  isValidDateString,
  BOOKING_TIMEZONE,
  WINDOW_START_HOUR,
  WINDOW_END_HOUR,
  SLOT_DURATION_MINUTES,
} from '../lib/booking-availability.ts';

console.log('====================================================');
console.log('GLOWSUITE BOOK A DEMO — PHASE 3 AVAILABILITY TESTS');
console.log('====================================================\n');

const TEST_DATE = '2026-10-15'; // A Thursday in 2026
// Fix simulated current time to 2026-10-15 at 06:00:00 IST (UTC 00:30:00) so all 09:00-22:30 slots are beyond 2h notice
const SIMULATED_EARLY_MORNING_MS = Date.parse(`${TEST_DATE}T06:00:00+05:30`);

// ---------------------------------------------------------------------
// Test A: Normal day: 09:00–22:30 slots generated (28 slots total)
// ---------------------------------------------------------------------
console.log('[Test A] Normal day slot generation (09:00 - 22:30)...');
const normalSlots = calculateAvailabilitySlots(TEST_DATE, [], SIMULATED_EARLY_MORNING_MS);
assert.strictEqual(normalSlots.length, 28, 'Must generate exactly 28 slots for a day');
assert.strictEqual(normalSlots[0].time, '09:00', 'First slot must be 09:00');
assert.strictEqual(normalSlots[0].range, '09:00 AM – 09:30 AM', 'First slot range must be 09:00 AM – 09:30 AM');
assert.strictEqual(normalSlots[normalSlots.length - 1].time, '22:30', 'Last slot must be 22:30');
assert.strictEqual(normalSlots[normalSlots.length - 1].range, '10:30 PM – 11:00 PM', 'Last slot range must be 10:30 PM – 11:00 PM');
assert(normalSlots.every(s => s.available === true), 'All slots must be available on an empty schedule with early notice');
console.log('  ✓ Generated exactly 28 slots from 09:00 to 22:30, all available.');

// ---------------------------------------------------------------------
// Test B: Busy event: 10:00–11:00 blocks 10:00 and 10:30
// ---------------------------------------------------------------------
console.log('\n[Test B] Busy event 10:00–11:00 blocks 10:00 and 10:30...');
const busyB = [
  { start: `${TEST_DATE}T10:00:00+05:30`, end: `${TEST_DATE}T11:00:00+05:30` }
];
const slotsB = calculateAvailabilitySlots(TEST_DATE, busyB, SIMULATED_EARLY_MORNING_MS);
const slot1000 = slotsB.find(s => s.time === '10:00');
const slot1030 = slotsB.find(s => s.time === '10:30');
const slot1100 = slotsB.find(s => s.time === '11:00');
const slot0930 = slotsB.find(s => s.time === '09:30');

assert.strictEqual(slot1000.available, false, '10:00 slot must be blocked');
assert.strictEqual(slot1030.available, false, '10:30 slot must be blocked');
assert.strictEqual(slot0930.available, true, '09:30 slot must NOT be blocked');
assert.strictEqual(slot1100.available, true, '11:00 slot must NOT be blocked');
console.log('  ✓ 10:00 and 10:30 are blocked; 09:30 and 11:00 remain available.');

// ---------------------------------------------------------------------
// Test C: Event exactly ending at 10:00 (09:30–10:00) must NOT block 10:00
// ---------------------------------------------------------------------
console.log('\n[Test C] Boundary match: event ending at 10:00 (09:30–10:00) must NOT block 10:00...');
const busyC = [
  { start: `${TEST_DATE}T09:30:00+05:30`, end: `${TEST_DATE}T10:00:00+05:30` }
];
const slotsC = calculateAvailabilitySlots(TEST_DATE, busyC, SIMULATED_EARLY_MORNING_MS);
const slotC_0930 = slotsC.find(s => s.time === '09:30');
const slotC_1000 = slotsC.find(s => s.time === '10:00');

assert.strictEqual(slotC_0930.available, false, '09:30 slot must be blocked by 09:30-10:00 event');
assert.strictEqual(slotC_1000.available, true, '10:00 slot must NOT be blocked when event ends at 10:00');
console.log('  ✓ 09:30 blocked; 10:00 slot starts right as event ends and is available.');

// ---------------------------------------------------------------------
// Test D: Event exactly starting at 10:00 (10:00–10:30) must block the 10:00 slot
// ---------------------------------------------------------------------
console.log('\n[Test D] Boundary match: event starting at 10:00 (10:00–10:30) must block 10:00...');
const busyD = [
  { start: `${TEST_DATE}T10:00:00+05:30`, end: `${TEST_DATE}T10:30:00+05:30` }
];
const slotsD = calculateAvailabilitySlots(TEST_DATE, busyD, SIMULATED_EARLY_MORNING_MS);
const slotD_1000 = slotsD.find(s => s.time === '10:00');
const slotD_1030 = slotsD.find(s => s.time === '10:30');

assert.strictEqual(slotD_1000.available, false, '10:00 slot must be blocked');
assert.strictEqual(slotD_1030.available, true, '10:30 slot must NOT be blocked');
console.log('  ✓ 10:00 blocked; 10:30 remains available.');

// ---------------------------------------------------------------------
// Test E: Minimum notice: Current time 10:00 means slots before 12:00 are unavailable
// ---------------------------------------------------------------------
console.log('\n[Test E] Minimum notice: Current time 10:00 IST blocks slots before 12:00 IST...');
const SIMULATED_10AM_MS = Date.parse(`${TEST_DATE}T10:00:00+05:30`);
const slotsE = calculateAvailabilitySlots(TEST_DATE, [], SIMULATED_10AM_MS);
const slotsBefore12 = slotsE.filter(s => s.time < '12:00');
const slotE_1200 = slotsE.find(s => s.time === '12:00');
const slotE_1230 = slotsE.find(s => s.time === '12:30');

assert(slotsBefore12.every(s => s.available === false), 'All slots before 12:00 must be unavailable (< 2hr notice)');
assert.strictEqual(slotE_1200.available, true, '12:00 slot (exactly 2 hours away) must be available');
assert.strictEqual(slotE_1230.available, true, '12:30 slot (> 2 hours away) must be available');
console.log('  ✓ 09:00, 09:30, 10:00, 10:30, 11:00, 11:30 unavailable; 12:00 and onwards available.');

// ---------------------------------------------------------------------
// Test F: Late evening: 22:30–23:00 is valid
// ---------------------------------------------------------------------
console.log('\n[Test F] Late evening: 22:30–23:00 is valid and generated...');
const lateSlot = normalSlots.find(s => s.time === '22:30');
assert(Boolean(lateSlot), '22:30 slot must exist');
assert.strictEqual(lateSlot.range, '10:30 PM – 11:00 PM', 'Late slot must range from 10:30 PM to 11:00 PM');
console.log('  ✓ 22:30 slot exists with range "10:30 PM – 11:00 PM".');

// ---------------------------------------------------------------------
// Test G: 23:00 must NOT be offered as a start time
// ---------------------------------------------------------------------
console.log('\n[Test G] 23:00 must NOT be offered as a start time...');
const slot2300 = normalSlots.find(s => s.time === '23:00');
assert.strictEqual(slot2300, undefined, '23:00 must NOT exist as a slot start time');
console.log('  ✓ Confirmed 23:00 is never offered as a start time.');

// ---------------------------------------------------------------------
// Test H: Weekend: Saturday and Sunday work exactly like weekdays
// ---------------------------------------------------------------------
console.log('\n[Test H] Weekend: Saturday and Sunday work exactly like weekdays...');
const SATURDAY_DATE = '2026-10-17'; // Saturday
const SUNDAY_DATE = '2026-10-18';   // Sunday

const satSlots = calculateAvailabilitySlots(SATURDAY_DATE, [], Date.parse(`${SATURDAY_DATE}T06:00:00+05:30`));
const sunSlots = calculateAvailabilitySlots(SUNDAY_DATE, [], Date.parse(`${SUNDAY_DATE}T06:00:00+05:30`));

assert.strictEqual(satSlots.length, 28, 'Saturday must generate 28 slots');
assert(satSlots.every(s => s.available === true), 'Saturday slots must be open');
assert.strictEqual(sunSlots.length, 28, 'Sunday must generate 28 slots');
assert(sunSlots.every(s => s.available === true), 'Sunday slots must be open');
console.log('  ✓ Saturday and Sunday both generate 28 bookable slots matching weekdays.');

console.log('\n====================================================');
console.log('ALL 8 AVAILABILITY SPECIFICATION TESTS PASSED (A–H) ✓');
console.log('====================================================\n');
