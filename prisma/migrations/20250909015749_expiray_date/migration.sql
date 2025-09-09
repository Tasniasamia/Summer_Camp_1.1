/*
  Warnings:

  - Added the required column `expiryDate` to the `GoogleToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `googletoken` ADD COLUMN `expiryDate` DATETIME(3) NOT NULL;
