import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { getLetters } from "../../../../react-webpack-typescript-2021/src/components/wordle-game/WordleLogic";
import { getRegex } from "../../../logic/GetRegex";

export const getCreateUserRoute = (prismaClient: PrismaClient, secret: string) => async (request: Request, response: Response) => {
    const user = request.body

    const result = await prismaClient.user.create({
        data: {
            ...user
        }
    })

    const cookie = sign(result, secret, {expiresIn: '2d'})

    response.cookie('jwt', cookie)

    response.send(result)
}


