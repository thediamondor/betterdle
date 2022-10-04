/*
  Warnings:

  - A unique constraint covering the columns `[userId,dailyWordId]` on the table `UserDailyWord` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserDailyWord_dailyWordId_key";

-- DropIndex
DROP INDEX "UserDailyWord_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserDailyWord_userId_dailyWordId_key" ON "UserDailyWord"("userId", "dailyWordId");
