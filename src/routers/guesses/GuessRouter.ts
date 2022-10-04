import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import { getGetGuessStatsRoute } from "./routes/GetGuessStats"

export const getGuessRouter = (prismaClient: PrismaClient) => {
    const router = Router()

    router.get('/:guessId', getGetGuessStatsRoute(prismaClient))

    return router
}