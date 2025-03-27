/*
  Warnings:

  - A unique constraint covering the columns `[authorId,personId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Review_authorId_personId_key" ON "Review"("authorId", "personId");
