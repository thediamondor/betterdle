import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import logo from '@assets/images/logo.png';
import { Game, Guess, User } from '../../../models/User'
import '../complete-row/CompleteRow.less';
import { Link } from 'react-router-dom';
import { getLetters } from '../WordleLogic';

interface Props {
    guessWord: (word: string) => void;
    wordleWords: string[];
    rowIndex: number;
}

const keyToOperation: Record<string, (key: string, letters: string[], cntrl: boolean) => string[]> = {
    Backspace(key, letters, cntrl) {
        if (cntrl) {
            return []
        }

        return letters.slice(0, -1)
    },
    default(key, letters) {
        if (!/^[a-zA-Z]$/.test(key)) return letters

        if (letters.length === 5) {
            return letters
        }

        return [...letters, key.toLowerCase()]
    }
}

const CurrentRow: React.FC<Props> = ({ guessWord, wordleWords, rowIndex }) => {
    const [letters, setLetters] = useState<string[]>([])
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(false)
            }, 300)
        }
    }, [error])

    useEffect(() => {
        const onKeyUp = (e: KeyboardEvent) => {
            const operation = keyToOperation[e.key] ? keyToOperation[e.key] : keyToOperation.default

            setLetters((prev) => operation(e.key, prev, e.ctrlKey))
        }

        window.addEventListener('keyup', onKeyUp)

        return () => {
            window.removeEventListener('keyup', onKeyUp)
        }
    }, [])

    useEffect(() => {
        const onKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && letters.length === 5) {
                const word = letters.join('')
                if (!wordleWords.includes(word)) {
                    setError(true)
                } else {
                    guessWord(word)
                    setLetters([])
                }
            }
        }

        window.addEventListener('keyup', onKeyUp)

        return () => {
            window.removeEventListener('keyup', onKeyUp)
        }
    }, [letters])

    const padding: string[] = Array(5 - letters.length).fill(' ')

    const paddedletters = [...letters, ...padding]

    return (
        <>
            {paddedletters.map((letter, index) =>
                <div key={`row-${rowIndex}-letter-${index}`} className={`wordleLetter ${error ? 'wordleLettererror' : 'wordleLettercurrent'}`}>{letter.toUpperCase()}</div>
            )}
        </>
    );
};

export default hot(module)(CurrentRow);
