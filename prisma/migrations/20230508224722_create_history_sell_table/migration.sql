/*
  Warnings:

  - Added the required column `userId` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnumPaymentMethodType" AS ENUM ('PIX', 'DEBIT', 'CREDIT');

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SellHistory" (
    "id" TEXT NOT NULL,
    "movementId" TEXT NOT NULL,
    "paymentMethod" "EnumPaymentMethodType" NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(3),
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SellHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SellHistory" ADD CONSTRAINT "SellHistory_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "Movements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
