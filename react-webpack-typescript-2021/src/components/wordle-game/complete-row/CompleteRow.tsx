import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import logo from '@assets/images/logo.png';
import { Game, Guess, User } from '../../../models/User'
import './CompleteRow.less';
import { Link } from 'react-router-dom';
import { getLetters } from '../WordleLogic';
import { GameWithScores } from '@src/components/user-stats/UserStats';

interface Props {
    guess: Guess
    correctWord: string
    rowIndex: number
    stats: boolean,
    score: GameWithScores['scores'][number]
}


const CompleteRow: React.FC<Props> = ({ guess, correctWord, rowIndex, stats, score }) => {
    const letters = getLetters(guess.word, correctWord)
    return (
        <>
            {letters.map(({ letter, type }, index) =>
                <div key={`row-${rowIndex}-letter-${index}`} className={`wordleLetter wordleLetter${type}`}>{letter.toUpperCase()}</div>
            )}
            {stats && (
                <div className='row-stats'>
                    <div className='row-stats-score'>
                        Score: {score.score}
                    </div>
                    <div className='row-stats-word-count'>
                        Word Count: {score.wordCount}
                    </div>
                </div>
            )}
        </>
    );
};

export default hot(module)(CompleteRow);
