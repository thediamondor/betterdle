import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import logo from '@assets/images/logo.png';
import { User } from '../../models/User'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import WordleGame from '../wordle-game/WordleGame'

interface Props {

}

const GameStats: React.FC<Props> = () => {
    let params = useParams();

    const gameId = +params.gameId

    if (!gameId) {
        return null
    }

    return (
        <WordleGame gameId={gameId} stats={true}></WordleGame>
    );
};

export default hot(module)(GameStats);
