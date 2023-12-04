/*
  Warnings:

  - Added the required column `user_id` to the `ongs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ongs" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ongs" ADD CONSTRAINT "ongs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
