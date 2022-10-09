import { Letter } from "./GetLetters";

type LetterWithIndex = Letter & { letterIndex: number }

export const getRegex = (lettersArr: Letter[][]) => {
    let regexArray = '_____'.split('');

    const lettersWithIndex: LetterWithIndex[] = lettersArr.reduce<LetterWithIndex[]>((acc, letters)=> [...acc, ...letters.map((letter, index)=> ({...letter, letterIndex: index}))], [])

    lettersWithIndex.forEach(({ letter, type, letterIndex })=>{
        if(type === 'exact') {
            regexArray[letterIndex] = letter
        }
    })

    lettersWithIndex.forEach(({ letter, type, letterIndex })=>{
        if(type === 'some') {
            regexArray[letterIndex] = regexArray[letterIndex] === '_' 
                ? `[^${letter}]` 
                : regexArray[letterIndex].startsWith('[^') 
                    ? `${regexArray[letterIndex].slice(0,-1)}${letter}]`
                    : regexArray[letterIndex]
        }
    })

    const someLetters = lettersWithIndex.filter(({ type }) => type=== 'some')

    const someRegex = someLetters.map(({ letter})=> `(?=.*${letter})`).join('');

    const noneRegex = lettersWithIndex.filter(({type, letter}) => type==='none' && !someLetters.some(({letter: someLetter}) => letter === someLetter))
        .map(({ letter, type })=>`(?!.*${letter})`).join('');

    const finalRegex = `${someRegex}${noneRegex}${regexArray.map((letter)=> letter === '_' ? '[a-z]' : letter).join('')}`

    return finalRegex; 
}