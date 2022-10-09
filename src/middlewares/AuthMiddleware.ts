import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";


export const getAuthMiddleware = (secret: string) => async (request: Request, response: Response, next: NextFunction) => {
    const cookie = request.cookies && request.cookies['jwt']
    if(!cookie){
        response.sendStatus(511)
        return
    }
    try {
        verify(cookie, secret)
        next()
    } catch (error) {
        response.clearCookie('jwt')
        response.sendStatus(511)
    }
}


