import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import { getGetWordleWordsRoute } from "./routes/GetWordleWords"

export const getWordleWordRouter = (prismaClient: PrismaClient) => {
    const router = Router()

    router.get('/', getGetWordleWordsRoute(prismaClient))

    return router
}