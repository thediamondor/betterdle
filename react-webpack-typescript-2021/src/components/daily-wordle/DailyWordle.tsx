import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import logo from '@assets/images/logo.png';
import { User } from '../../models/User'
import { Link } from 'react-router-dom';
import axios from 'axios';
import WordleGame from '../wordle-game/WordleGame'

interface Props {
    
}

const DailyWordle: React.FC<Props> = () => {
    
    const [gameId, setGameId] = useState<number>(null)

    useEffect(()=> {
        axios.get('/games/daily').then(res => {
            setGameId(res.data.id)
        })
    }, [])

    if(!gameId){
        return null 
    }
    
    return (
        <WordleGame gameId={gameId} ></WordleGame>
    );
};

export default hot(module)(DailyWordle);
