/*
  Warnings:

  - Added the required column `status` to the `Bank_transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bank_transaction" ADD COLUMN     "status" "OnRampStatus" NOT NULL;
