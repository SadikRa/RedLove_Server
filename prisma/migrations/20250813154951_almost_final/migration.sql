/*
  Warnings:

  - You are about to drop the column `date` on the `event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contactPerson` to the `bloodRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientName` to the `bloodRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."UrgencyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- AlterTable
ALTER TABLE "public"."bloodRequest" ADD COLUMN     "caseDetails" TEXT,
ADD COLUMN     "contactPerson" TEXT NOT NULL,
ADD COLUMN     "hospital" TEXT,
ADD COLUMN     "patientName" TEXT NOT NULL,
ADD COLUMN     "unitsNeeded" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "public"."donorDetail" ADD COLUMN     "availability" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "canTravel" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "donationCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "healthInfo" TEXT;

-- AlterTable
ALTER TABLE "public"."event" DROP COLUMN "date",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "maxDonors" INTEGER,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "bloodType" "public"."BloodType",
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastActive" TIMESTAMP(3),
ADD COLUMN     "location" TEXT;

-- CreateTable
CREATE TABLE "public"."donation" (
    "id" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "requestId" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "public"."UrgencyLevel" NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "public"."users"("phone");

-- AddForeignKey
ALTER TABLE "public"."donation" ADD CONSTRAINT "donation_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
