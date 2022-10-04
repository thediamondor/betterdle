/*
  Warnings:

  - You are about to drop the column `gameId` on the `DailyWord` table. All the data in the column will be lost.
  - Added the required column `gameId` to the `UserDailyWord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DailyWord" DROP CONSTRAINT "DailyWord_gameId_fkey";

-- AlterTable
ALTER TABLE "DailyWord" DROP COLUMN "gameId";

-- AlterTable
ALTER TABLE "UserDailyWord" ADD COLUMN     "gameId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "UserDailyWord" ADD CONSTRAINT "UserDailyWord_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
