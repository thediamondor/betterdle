
export type LetterTypes = 'none' | 'some' | 'exact'

export interface Letter {
    letter: string;
    type: LetterTypes;
}

export const NUMBER_OF_GUESSES = 6

export const getLetters = (guessWord: string, correctWord: string): Letter[]=> {
    let remainingLetters = correctWord.split('');

    return guessWord.split('').map((letter, index)=> {
        const indexInCorrectExact = remainingLetters.findIndex((correctLetter, correctIndex)=> correctLetter === letter && correctIndex === index);

        const indexInCorrect = indexInCorrectExact !== -1? indexInCorrectExact : remainingLetters.findIndex((correctLetter)=> correctLetter === letter);

        if(indexInCorrect !== -1){
            remainingLetters[indexInCorrect] = '_'
        }

        return ({
            letter: letter,
            type: indexInCorrect === -1 ? 'none' : indexInCorrect === index ? 'exact' : 'some'
        })
    })
}