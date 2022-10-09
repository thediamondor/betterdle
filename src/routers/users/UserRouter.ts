import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import { getCreateUserRoute } from "./routes/CreateUser"
import { getSignInRoute } from "./routes/SignIn"

export const getUserRouter = (prismaClient: PrismaClient, secret: string) => {
    const router = Router()

    router.post('/signIn', getSignInRoute(prismaClient, secret))
    router.post('/signUp', getCreateUserRoute(prismaClient, secret))

    return router
}