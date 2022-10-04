import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const getGetWordleWordsRoute = (prismaClient: PrismaClient) => async (request: Request, response: Response) => {
    const result = await prismaClient.wordleWord.findMany()

    response.send(result.map(wordleWordObject => wordleWordObject.word))
}


