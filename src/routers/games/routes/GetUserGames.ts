import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getGameStats } from "../../../logic/GameStats";

export const getGetUserGamesRoute = (prismaClient: PrismaClient) => async (request: Request, response: Response) => {
    const userId = 1

    const result = await prismaClient.game.findMany({
        where: { userId: { equals: userId } },
        orderBy: {
            createdAt: 'asc'
        },
        include: {
            guesses: { orderBy: {guessedAt: 'asc'}}
        }
    })

    const gamesWithGuessScores = await Promise.all(result.map(async game=> ({
        ...game,
        scores: await getGameStats(game, prismaClient)
    })))

    response.send(gamesWithGuessScores)
}


