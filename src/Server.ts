import dotenv from 'dotenv';
import express, {Router} from 'express'
import { getGameRouter } from './routers/games/GameRouter';
import { PrismaClient } from '@prisma/client'
import path from 'path'
import { getGuessRouter } from './routers/guesses/GuessRouter';
import { getWordleWordRouter } from './routers/wordle-words/WordleWordRouter';
import bodyParser from 'body-parser';

export const runServer = ()=> {
    dotenv.config()

    const server = express()

    const prismaClient = new PrismaClient()
    
    server.use(express.static(path.join(__dirname, '../react-webpack-typescript-2021/dist')))
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json())
    server.use('/games', getGameRouter(prismaClient))
    server.use('/guesses', getGuessRouter(prismaClient))
    server.use('/wordleWords', getWordleWordRouter(prismaClient))

    server.listen(5000, ()=> {
        console.log('server listening')
    })
}