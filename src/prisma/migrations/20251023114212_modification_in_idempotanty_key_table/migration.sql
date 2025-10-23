/*
  Warnings:

  - Made the column `bookingId` on table `idempotantykey` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `idempotantykey` DROP FOREIGN KEY `IdempotantyKey_bookingId_fkey`;

-- AlterTable
ALTER TABLE `idempotantykey` MODIFY `bookingId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `IdempotantyKey` ADD CONSTRAINT `IdempotantyKey_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
