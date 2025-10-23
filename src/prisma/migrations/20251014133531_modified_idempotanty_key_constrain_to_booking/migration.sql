/*
  Warnings:

  - A unique constraint covering the columns `[idempotantyKey]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Made the column `idempotantyKey` on table `booking` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `booking` MODIFY `idempotantyKey` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Booking_idempotantyKey_key` ON `Booking`(`idempotantyKey`);
