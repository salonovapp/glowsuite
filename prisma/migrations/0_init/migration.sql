-- CreateTable
CREATE TABLE "demo_leads" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(30) NOT NULL,
    "salon_name" VARCHAR(255) NOT NULL,
    "state" VARCHAR(100) NOT NULL,
    "district" VARCHAR(150) NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'new',
    "notes" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "demo_leads_pkey" PRIMARY KEY ("id")
);
