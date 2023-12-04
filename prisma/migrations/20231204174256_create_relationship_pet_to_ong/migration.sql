/*
  Warnings:

  - Added the required column `ong_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "ong_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_ong_id_fkey" FOREIGN KEY ("ong_id") REFERENCES "ongs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
