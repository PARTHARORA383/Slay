-- CreateTable
CREATE TABLE "Bank_Account" (
    "id" SERIAL NOT NULL,
    "UserId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bank_balance" INTEGER NOT NULL,
    "Account_number" INTEGER NOT NULL,

    CONSTRAINT "Bank_Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bank_transaction" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "accountNumber" INTEGER NOT NULL,

    CONSTRAINT "Bank_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bank_Account_Account_number_key" ON "Bank_Account"("Account_number");

-- AddForeignKey
ALTER TABLE "Bank_transaction" ADD CONSTRAINT "Bank_transaction_accountNumber_fkey" FOREIGN KEY ("accountNumber") REFERENCES "Bank_Account"("Account_number") ON DELETE RESTRICT ON UPDATE CASCADE;
