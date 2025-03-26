-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "isAnonymous" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "linkedinUrl" TEXT,
ADD COLUMN     "termsAccepted" TIMESTAMP(3);
