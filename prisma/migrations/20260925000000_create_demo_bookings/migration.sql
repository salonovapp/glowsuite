-- CreateTable
CREATE TABLE IF NOT EXISTS "demo_bookings" (
    "id" TEXT NOT NULL,
    "leadId" BIGINT,
    "date" VARCHAR(10) NOT NULL,
    "time" VARCHAR(10) NOT NULL,
    "slotStart" TIMESTAMPTZ(6) NOT NULL,
    "slotEnd" TIMESTAMPTZ(6) NOT NULL,
    "googleEventId" VARCHAR(255) NOT NULL,
    "googleMeetUrl" TEXT NOT NULL,
    "idempotencyKey" VARCHAR(255) NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'confirmed',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "demo_bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "demo_bookings_googleEventId_key" ON "demo_bookings"("googleEventId");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "demo_bookings_idempotencyKey_key" ON "demo_bookings"("idempotencyKey");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "demo_bookings_date_time_key" ON "demo_bookings"("date", "time");
