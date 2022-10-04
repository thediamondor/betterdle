/*
  Warnings:

  - Added the required column `gameId` to the `DailyWord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DailyWord" ADD COLUMN     "gameId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "DailyWord" ADD CONSTRAINT "DailyWord_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
