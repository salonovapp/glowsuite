-- AlterTable
ALTER TABLE "demo_bookings" ADD COLUMN "customerEmailSentAt" TIMESTAMPTZ(6),
ADD COLUMN "customerEmailId" VARCHAR(100),
ADD COLUMN "internalEmailSentAt" TIMESTAMPTZ(6),
ADD COLUMN "internalEmailId" VARCHAR(100);
