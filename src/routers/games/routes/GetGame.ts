import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const getGetGameRoute = (prismaClient: PrismaClient) => async (request: Request, response: Response) => {
    const gameId = +request.params.gameId

    const result = await prismaClient.game.findUnique({
        where: { id: gameId },
        include: {
            guesses: { orderBy: {guessedAt: 'asc'}}
        }
    })

    response.send(result)
}


