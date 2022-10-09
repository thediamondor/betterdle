import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import logo from '@assets/images/logo.png';
import { Game, Guess, User } from '../../models/User'
import './WordleGame.less';
import { Link } from 'react-router-dom';
import CompleteRow from './complete-row/CompleteRow';
import CurrentRow from './current-row/CurrentRow';
import { NUMBER_OF_GUESSES } from './WordleLogic';
import axios from 'axios'
import DisabledRow from './disabled-row/DisabledRow';
import { GameWithScores } from '../user-stats/UserStats';

interface Props {
    gameId: number,
    createNewGame?: () => void,
    stats?: boolean
}

const useWordleWords = () => {
    const [wordleWords, setWordleWords] = useState<string[]>(null)

    useEffect(() => {
        axios.get('/wordleWords')
            .then(response => setWordleWords(response.data))
    }, [])

    return wordleWords
}

const useGame = (gameId: number, stats: boolean) => {
    const [game, setGame] = useState<GameWithScores & { guesses: Guess[]; }>(null)

    useEffect(() => {
        axios.get(`/games/${gameId}${stats?'/stats': ''}`)
            .then(response => setGame(response.data))
    }, [gameId])

    const addGuess = (word: string) => {
        axios.patch(`/games/${gameId}`, { word })
            .then(response => setGame(response.data))
    }

    return { game, addGuess }
}


const WordleGame: React.FC<Props> = ({  gameId, createNewGame, stats=false }) => {
    const wordleWords = useWordleWords()
    const { game, addGuess } = useGame(gameId, stats)
    if (!wordleWords || !game) {
        return <div>loading</div>
    }

    const initialGuesses = game?.guesses

    const guessedCorrect = initialGuesses?.some(guess => guess.word === game.correctWord)

    const guessWord = (word: string) => {
        if (initialGuesses.length < NUMBER_OF_GUESSES) {
            addGuess(word)
        }
    }
    const sortedInitialGuesses = initialGuesses.sort((guess1, guess2) => new Date(guess1.guessedAt).getTime() - new Date(guess2.guessedAt).getTime())

    return (
        <div id="gameContainer">
            <div id="wordleContainer">
                {Array(6).fill(0).map((_, index) => {
                    const completeGuess = sortedInitialGuesses[index]

                    return (
                        <div className='wordleRow'>
                            {
                                completeGuess
                                    ? <CompleteRow 
                                        key={`complete-row-${index}`} 
                                        correctWord={game.correctWord} 
                                        guess={completeGuess} 
                                        rowIndex={index} 
                                        stats={stats} 
                                        score={game.scores && game.scores[index]} 
                                        canCalculateBest={game.scores && game.scores[index-1] && game.scores[index-1].wordCount < 20}
                                    />
                                    : index === sortedInitialGuesses.length && !guessedCorrect
                                        ? <CurrentRow key={`current-row`} guessWord={guessWord} wordleWords={wordleWords} rowIndex={index}></CurrentRow>
                                        : <DisabledRow key={`diabled-row-${index}`} rowIndex={index} />
                            }
                        </div>
                    )
                })}
            </div>

            {(guessedCorrect || initialGuesses.length === 6) && createNewGame && <button id="newGameButton" onClick={createNewGame}>New Game</button>}

        </div>
    );
};

export default hot(module)(WordleGame);
