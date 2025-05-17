/*
  Warnings:

  - You are about to drop the column `paymentStatus` on the `P2PTransaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "P2PTransaction" DROP COLUMN "paymentStatus",
ADD COLUMN     "recieverStatus" TEXT NOT NULL DEFAULT 'Recieved',
ADD COLUMN     "senderStatus" TEXT NOT NULL DEFAULT 'Sent';

-- DropEnum
DROP TYPE "PaymentStatus";
