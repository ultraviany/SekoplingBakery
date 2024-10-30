-- CreateTable
CREATE TABLE `cakes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cake_name` VARCHAR(191) NOT NULL DEFAULT '',
    `cake_price` DOUBLE NOT NULL DEFAULT 0,
    `cake_image` VARCHAR(191) NOT NULL DEFAULT '',
    `best_before` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cake_flavor` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `composition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cakes_id` INTEGER NOT NULL DEFAULT 0,
    `material_id` INTEGER NOT NULL DEFAULT 0,
    `qty` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cakesId` INTEGER NULL,
    `materialsId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `materials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `material_name` VARCHAR(191) NOT NULL DEFAULT '',
    `material_price` DOUBLE NOT NULL DEFAULT 0,
    `material_type` ENUM('powder', 'liquid', 'solid') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suppliers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `supliers_name` VARCHAR(191) NOT NULL DEFAULT '',
    `supliers_addres` VARCHAR(191) NOT NULL DEFAULT '',
    `supliers_phone` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supply` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `supply_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `suppliers_id` INTEGER NOT NULL DEFAULT 0,
    `user_id` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `suppliersId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detail_suppliers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `supply_id` INTEGER NOT NULL DEFAULT 0,
    `material_id` INTEGER NOT NULL DEFAULT 0,
    `material_price` DOUBLE NOT NULL DEFAULT 0,
    `qty` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `supplyId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('process', 'deliverer') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `composition` ADD CONSTRAINT `composition_cakesId_fkey` FOREIGN KEY (`cakesId`) REFERENCES `cakes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `composition` ADD CONSTRAINT `composition_materialsId_fkey` FOREIGN KEY (`materialsId`) REFERENCES `materials`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supply` ADD CONSTRAINT `supply_suppliersId_fkey` FOREIGN KEY (`suppliersId`) REFERENCES `suppliers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_suppliers` ADD CONSTRAINT `detail_suppliers_supplyId_fkey` FOREIGN KEY (`supplyId`) REFERENCES `supply`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
