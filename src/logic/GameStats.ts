import { Game, Guess, PrismaClient } from "@prisma/client"
import { getLetters } from "./GetLetters"
import { getRegex } from "./GetRegex"

const getWordCount = async (prismaClient: PrismaClient, regex: string): Promise<number>=> (await prismaClient.$queryRawUnsafe<{word: string}[]>(
    `SELECT word FROM api."WordleWord" WHERE word ~ '${regex}'`)).length


export const getGameStats = async (game: Game & {guesses: Guess[]}, prismaClient: PrismaClient)=> {
    const correctWord = game?.correctWord
    const previousGuesses = game?.guesses

    const lettersArray = previousGuesses.map((guess)=> getLetters(guess.word, correctWord))

    const guessScores = await previousGuesses.reduce(async (acc,{id, word}, index)=>{
            const currentLettersArray = lettersArray.slice(0, index + 1)
            const currentRegex = getRegex(currentLettersArray)
            const currentWordCount = await getWordCount(prismaClient, currentRegex)

            const promisedAcc = await acc;

            return {
                arr: [
                    ...promisedAcc.arr, 
                    {
                        id,
                        word,
                        score: promisedAcc.prevCount / currentWordCount - 1,
                        wordCount: currentWordCount
                    }
                ],
                prevCount: currentWordCount
            }
        }, 
        new Promise<{arr: (Guess & {score: number})[], prevCount: number}>((res)=>res({arr: [], prevCount: 12974}))
    )

    return guessScores.arr
}