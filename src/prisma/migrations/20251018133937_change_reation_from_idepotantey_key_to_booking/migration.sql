/*
  Warnings:

  - You are about to drop the column `idempotantyKeyId` on the `booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bookingId]` on the table `IdempotantyKey` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_idempotantyKeyId_fkey`;

-- DropIndex
DROP INDEX `Booking_idempotantyKeyId_key` ON `booking`;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `idempotantyKeyId`;

-- AlterTable
ALTER TABLE `idempotantykey` ADD COLUMN `bookingId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `IdempotantyKey_bookingId_key` ON `IdempotantyKey`(`bookingId`);

-- AddForeignKey
ALTER TABLE `IdempotantyKey` ADD CONSTRAINT `IdempotantyKey_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
