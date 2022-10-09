import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import { getGetBestGuessRoute } from "./routes/GetBestGuess"
import { getGetGuessStatsRoute } from "./routes/GetGuessStats"

export const getGuessRouter = (prismaClient: PrismaClient) => {
    const router = Router()

    router.get('/:guessId', getGetGuessStatsRoute(prismaClient))
    router.get('/:guessId/best', getGetBestGuessRoute(prismaClient))

    return router
}