-- CreateTable
CREATE TABLE "DailyWord" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "word" TEXT NOT NULL,

    CONSTRAINT "DailyWord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDailyWord" (
    "dailyWordId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDailyWord_dailyWordId_key" ON "UserDailyWord"("dailyWordId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDailyWord_userId_key" ON "UserDailyWord"("userId");

-- AddForeignKey
ALTER TABLE "DailyWord" ADD CONSTRAINT "DailyWord_word_fkey" FOREIGN KEY ("word") REFERENCES "WordleWord"("word") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDailyWord" ADD CONSTRAINT "UserDailyWord_dailyWordId_fkey" FOREIGN KEY ("dailyWordId") REFERENCES "DailyWord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDailyWord" ADD CONSTRAINT "UserDailyWord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
