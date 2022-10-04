import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import logo from '@assets/images/logo.png';
import { User } from '../../models/User'
import { Link } from 'react-router-dom';
import axios from 'axios';
import WordleGame from '../wordle-game/WordleGame'

interface Props {
    
}

const createNewGame = (setGameId: (gameId: number)=> void)=> {
    axios.get('/games/practice').then(res => {
        setGameId(res.data.id)
    })
}

const PracticeWordle: React.FC<Props> = () => {
    
    const [gameId, setGameId] = useState<number>(null)

    useEffect(()=> {
        createNewGame(setGameId)
    }, [])

    if(!gameId){
        return null 
    }
    
    return (
        <WordleGame gameId={gameId} createNewGame={()=> createNewGame(setGameId)}></WordleGame>
    );
};

export default hot(module)(PracticeWordle);
