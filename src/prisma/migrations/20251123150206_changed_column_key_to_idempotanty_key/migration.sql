/*
  Warnings:

  - You are about to drop the column `key` on the `idempotantykey` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idempotantyKey]` on the table `IdempotantyKey` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idempotantyKey` to the `IdempotantyKey` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `IdempotantyKey_key_key` ON `idempotantykey`;

-- AlterTable
ALTER TABLE `idempotantykey` DROP COLUMN `key`,
    ADD COLUMN `idempotantyKey` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `IdempotantyKey_idempotantyKey_key` ON `IdempotantyKey`(`idempotantyKey`);
