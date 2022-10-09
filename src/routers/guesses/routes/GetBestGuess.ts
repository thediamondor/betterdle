import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getLetters } from "../../../../react-webpack-typescript-2021/src/components/wordle-game/WordleLogic";
import { getWordCount, getWords } from "../../../logic/GameStats";
import { getRegex } from "../../../logic/GetRegex";

export const getGetBestGuessRoute = (prismaClient: PrismaClient) => async (request: Request, response: Response) => {
    const guessId = +request.params.guessId


    const { game } = await prismaClient.guess.findUnique({
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

    const guessesBefore = game.guesses.slice(0, game.guesses.findIndex(guess => guess.id === guessId))

    const correctWordlettersArray = guessesBefore.map((guess) => getLetters(guess.word, game.correctWord))

    const viableWords = await getWords(prismaClient, getRegex(correctWordlettersArray))

    const wordsAvgs = await (viableWords.reduce(async (acc, word) => {
        const sum = await viableWords.reduce(async (acc2, word2) => {
            const regex = getRegex([...correctWordlettersArray, getLetters(word, word2)])
            return await acc2 + await getWordCount(prismaClient, regex)
        }, Promise.resolve(0));

        const prev = await acc

        return prev.avg > (sum / viableWords.length) ? { word, avg: sum / viableWords.length } : prev
    }, Promise.resolve({ word: '', avg: viableWords.length })))

    response.send(wordsAvgs)
}


