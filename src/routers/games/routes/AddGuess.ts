import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const getAddGameRoute = (prismaClient: PrismaClient) => async (request: Request, response: Response) => {
    const gameId = +request.params.gameId
    const word: string = request.body.word
    console.log(request.body)
    const result = await prismaClient.guess.create({
        data: {
            game: { connect: { id: gameId } },
            wordObj: { connect: { word: word } }
        },
        include: {
            game: {
                include: {
                    guesses: true
                }
            }
        }
    })

    response.send(result.game)
}


