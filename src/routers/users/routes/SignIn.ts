import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { getLetters } from "../../../../react-webpack-typescript-2021/src/components/wordle-game/WordleLogic";
import { getRegex } from "../../../logic/GetRegex";

export const getSignInRoute = (prismaClient: PrismaClient, secret: string) => async (request: Request, response: Response) => {
    const {password, email} = request.body
    const result = await prismaClient.user.findUnique({
        where: {
            email: email
        }
    })
    if(!result || result.password !== password){
        response.sendStatus(404)
        return 
    }

    const cookie = sign(result, secret, {expiresIn: '2d'})

    response.cookie('jwt', cookie)

    response.sendStatus(200)
}


