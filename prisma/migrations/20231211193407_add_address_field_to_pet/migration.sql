/*
  Warnings:

  - Added the required column `address` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip_code` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'Brazil',
ADD COLUMN     "latitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "longitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "zip_code" DECIMAL(65,30) NOT NULL;
