-- AlterTable
ALTER TABLE "P2PTransaction" ADD COLUMN     "recieverEmail" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "reciverName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "senderEmail" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "senderName" TEXT NOT NULL DEFAULT '';
