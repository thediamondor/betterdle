import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const getGetPracticeGameRoute = (prismaClient: PrismaClient) => async (request: Request, response: Response) => {
    const userId = 1 // getUserId

    const wordleWords = await prismaClient.wordleWord.findMany()

    const randomIndex = Math.floor(Math.random() * wordleWords.length)

    const randomWordleWord = wordleWords[randomIndex].word

    const practiceGame = await prismaClient.game.create({
        data: {
            correctWordObj: {connect: {word: randomWordleWord}},
            user: {connect: {id: userId}}
        }
    })

    response.send(practiceGame)
}


