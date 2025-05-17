-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Received', 'Sent');

-- AlterTable
ALTER TABLE "P2PTransaction" ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'Sent';
