/*
  Warnings:

  - You are about to drop the `blood_request` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."blood_request" DROP CONSTRAINT "blood_request_requesterId_fkey";

-- DropTable
DROP TABLE "public"."blood_request";

-- CreateTable
CREATE TABLE "public"."blood_requests" (
    "id" TEXT NOT NULL,
    "requesterId" TEXT NOT NULL,
    "bloodType" "public"."BloodType" NOT NULL,
    "location" TEXT NOT NULL,
    "urgency" "public"."UrgencyLevel" NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'PENDING',
    "patientName" TEXT NOT NULL,
    "hospital" TEXT,
    "unitsNeeded" INTEGER NOT NULL DEFAULT 1,
    "caseDetails" TEXT,
    "contactPerson" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blood_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "blood_requests_bloodType_idx" ON "public"."blood_requests"("bloodType");

-- CreateIndex
CREATE INDEX "blood_requests_urgency_idx" ON "public"."blood_requests"("urgency");

-- CreateIndex
CREATE INDEX "blood_requests_status_idx" ON "public"."blood_requests"("status");

-- AddForeignKey
ALTER TABLE "public"."blood_requests" ADD CONSTRAINT "blood_requests_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
