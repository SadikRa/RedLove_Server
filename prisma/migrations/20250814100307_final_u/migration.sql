/*
  Warnings:

  - You are about to drop the `bloodRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `donorDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."bloodRequest" DROP CONSTRAINT "bloodRequest_requesterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."donorDetail" DROP CONSTRAINT "donorDetail_userId_fkey";

-- DropTable
DROP TABLE "public"."bloodRequest";

-- DropTable
DROP TABLE "public"."donorDetail";

-- CreateTable
CREATE TABLE "public"."donor_details" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bloodType" "public"."BloodType" NOT NULL,
    "healthInfo" TEXT,
    "donationCount" INTEGER NOT NULL DEFAULT 0,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "canTravel" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT NOT NULL,
    "lastDonationDate" TIMESTAMP(3),

    CONSTRAINT "donor_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."blood_request" (
    "id" TEXT NOT NULL,
    "requesterId" TEXT NOT NULL,
    "bloodType" "public"."BloodType" NOT NULL,
    "location" TEXT NOT NULL,
    "urgency" "public"."Status" NOT NULL,
    "status" "public"."Status" NOT NULL,
    "patientName" TEXT NOT NULL,
    "hospital" TEXT,
    "unitsNeeded" INTEGER NOT NULL DEFAULT 1,
    "caseDetails" TEXT,
    "contactPerson" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blood_request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "donor_details_userId_key" ON "public"."donor_details"("userId");

-- AddForeignKey
ALTER TABLE "public"."donor_details" ADD CONSTRAINT "donor_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."blood_request" ADD CONSTRAINT "blood_request_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
