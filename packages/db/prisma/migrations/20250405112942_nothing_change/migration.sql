/*
  Warnings:

  - Added the required column `startTime` to the `Bank_transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bank_transaction" ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
