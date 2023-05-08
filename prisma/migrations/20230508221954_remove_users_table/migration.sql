/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Movements" DROP CONSTRAINT "Movements_userId_fkey";

-- DropTable
DROP TABLE "Users";
