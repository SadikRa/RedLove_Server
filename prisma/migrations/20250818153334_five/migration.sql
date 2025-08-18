/*
  Warnings:

  - Changed the type of `urgency` on the `blood_request` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."blood_request" DROP COLUMN "urgency",
ADD COLUMN     "urgency" "public"."UrgencyLevel" NOT NULL;
