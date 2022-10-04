import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getLetters } from "../../../../react-webpack-typescript-2021/src/components/wordle-game/WordleLogic";
import { getRegex } from "../../../logic/GetRegex";

export const getGetGuessStatsRoute = (prismaClient: PrismaClient) => async (request: Request, response: Response) => {
    const guessId = +request.params.guessId


    const result = await prismaClient.guess.findUnique({
        where: {
            id: guessId
        },
        include: {
            game: {
                include: {
                    guesses: {
                        orderBy: { guessedAt: 'asc' }
                    }
                }
            }
        }
    })
    const correctWord = result?.game.correctWord
    const previousGuesses = result?.game.guesses

    const requestedGuessIndex = previousGuesses.findIndex((guess) => guess.id === guessId)

    const lettersArray = previousGuesses.map((guess) => getLetters(guess.word, correctWord))

    const previousRegex = getRegex(lettersArray.slice(0, requestedGuessIndex))
    const regex = getRegex(lettersArray.slice(0, requestedGuessIndex + 1))

    const previousCount = await prismaClient.$queryRawUnsafe<{ word: string }[]>(
        `SELECT word FROM api."WordleWord" WHERE word ~ '${previousRegex}'`)


    const count = await prismaClient.$queryRawUnsafe<{ word: string }[]>(
        `SELECT word FROM api."WordleWord" WHERE word ~ '${regex}'`)

    const score = previousCount.length / count.length;

    response.send({ score, previousCount: previousCount.length, count: count.length })
}


