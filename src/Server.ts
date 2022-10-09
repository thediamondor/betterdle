import dotenv from 'dotenv';
import httpContext from 'express-http-context'
import express, {Router} from 'express'
import { getGameRouter } from './routers/games/GameRouter';
import { PrismaClient } from '@prisma/client'
import path from 'path'
import { getGuessRouter } from './routers/guesses/GuessRouter';
import { getWordleWordRouter } from './routers/wordle-words/WordleWordRouter';
import bodyParser from 'body-parser';
import { getUserRouter } from './routers/users/UserRouter';
import { getAuthMiddleware } from './middlewares/AuthMiddleware';
import cookies from 'cookie-parser'

export const runServer = ()=> {
    dotenv.config()

    const server = express()

    const prismaClient = new PrismaClient()

    server.use(httpContext.middleware);
    server.use(cookies());
    server.use(express.static(path.join(__dirname, '../react-webpack-typescript-2021/dist')))
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json())
    server.use('/users', getUserRouter(prismaClient, process.env.SECRET))
    server.use(getAuthMiddleware(process.env.SECRET))
    server.use('/games', getGameRouter(prismaClient))
    server.use('/guesses', getGuessRouter(prismaClient))
    server.use('/wordleWords', getWordleWordRouter(prismaClient))

    server.listen(5000, ()=> {
        console.log('server listening')
    })
}