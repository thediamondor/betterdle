import { Guess, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getLetters } from "../../../../react-webpack-typescript-2021/src/components/wordle-game/WordleLogic";
import { getGameStats } from "../../../logic/GameStats";
import { getRegex } from "../../../logic/GetRegex";




export const getGetGameStatsRoute = (prismaClient: PrismaClient) => async (request: Request, response: Response) => {
    const gameId = +request.params.gameId 

    const result = await prismaClient.game.findUnique({
        where: {
            id: gameId
        },
        include: {
            guesses: {
                orderBy: {guessedAt: 'asc'}
            }
        }
            
    })
    
    const scores = await getGameStats(result, prismaClient)

    response.send({...result, scores })
}


