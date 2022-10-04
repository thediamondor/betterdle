import { PrismaClient } from "@prisma/client";
import { addDays, differenceInDays } from "date-fns";
import { Request, Response } from "express";

const startingDate = new Date(1664398800000)

export const getGetDailyGameRoute = (prismaClient: PrismaClient) => async (request: Request, response: Response) => {
    const userId = 1 // getUserId

    const now = new Date()

    const midnightToday = now
    midnightToday.setHours(0, 0, 0, 0)

    let dailyWord = await prismaClient.dailyWord.findFirst({
        where: {
            date: { equals: midnightToday }
        }
    })

    const daysFromStartingDate = differenceInDays(now, startingDate)
    const wordleWordToday = (await prismaClient.wordleWord.findMany({
        orderBy: {id: 'asc'}
    }))[daysFromStartingDate % 12974].word

    if (!dailyWord) {
        dailyWord = await prismaClient.dailyWord.create({
            data: {
                wordObj: {
                    connect: { word: wordleWordToday }
                },
                date: midnightToday,
            }
        })
    }

    let userDailyGame = await prismaClient.userDailyWord.findUnique({
        where: {
            userId_dailyWordId: { dailyWordId: dailyWord.id, userId: userId }
        },
        include: {
            game: {
                include: {
                    guesses: true
                }
            }
        }
    })

    if (!userDailyGame) {
        userDailyGame = await prismaClient.userDailyWord.create({
            data: {
                dailyWord: { connect: { id: dailyWord.id } },
                game: {
                    create: {
                        correctWordObj: { connect: { word: wordleWordToday } },
                        user: { connect: { id: userId } }
                    }
                },
                user: { connect: { id: userId } }
            },
            include: {
                game: {
                    include: {
                        guesses: true
                    }
                }
            }
        })
    }

    response.send(userDailyGame.game)
}


