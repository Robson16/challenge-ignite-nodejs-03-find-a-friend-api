/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `ongs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ongs_title_key" ON "ongs"("title");
