/*
  Warnings:

  - You are about to drop the column `supliers_addres` on the `suppliers` table. All the data in the column will be lost.
  - You are about to drop the column `supliers_name` on the `suppliers` table. All the data in the column will be lost.
  - You are about to drop the column `supliers_phone` on the `suppliers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `suppliers` DROP COLUMN `supliers_addres`,
    DROP COLUMN `supliers_name`,
    DROP COLUMN `supliers_phone`,
    ADD COLUMN `suppliers_addres` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `suppliers_name` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `suppliers_phone` VARCHAR(191) NOT NULL DEFAULT '';
