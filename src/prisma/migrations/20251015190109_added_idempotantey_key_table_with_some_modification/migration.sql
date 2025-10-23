/*
  Warnings:

  - You are about to drop the column `idempotantyKey` on the `booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idempotantyKeyId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idempotantyKeyId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Booking_idempotantyKey_key` ON `booking`;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `idempotantyKey`,
    ADD COLUMN `idempotantyKeyId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `IdempotantyKey` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `finalized` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Booking_idempotantyKeyId_key` ON `Booking`(`idempotantyKeyId`);

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_idempotantyKeyId_fkey` FOREIGN KEY (`idempotantyKeyId`) REFERENCES `IdempotantyKey`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
