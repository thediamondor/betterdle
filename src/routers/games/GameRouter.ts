import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import { getAddGameRoute } from "./routes/AddGuess"
import { getGetDailyGameRoute } from "./routes/GetDailyGame"
import { getGetGameRoute } from "./routes/GetGame"
import { getGetGameStatsRoute } from "./routes/GetGameStats"
import { getGetPracticeGameRoute } from "./routes/GetPracticeGame"
import { getGetUserGamesRoute } from "./routes/GetUserGames"

export const getGameRouter = (prismaClient: PrismaClient) => {
    const router = Router()

    router.get('/', getGetUserGamesRoute(prismaClient))
    router.get('/:gameId/stats', getGetGameStatsRoute(prismaClient))
    router.get('/daily', getGetDailyGameRoute(prismaClient))
    router.get('/practice', getGetPracticeGameRoute(prismaClient))
    router.get('/:gameId', getGetGameRoute(prismaClient))
    router.patch('/:gameId', getAddGameRoute(prismaClient))

    return router
}