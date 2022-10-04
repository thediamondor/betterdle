import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import { useNavigate } from "react-router-dom";
import logo from '@assets/images/logo.png';
import { Game, User } from '../../models/User'
import { Link } from 'react-router-dom';
import axios from 'axios';
import WordleGame from '../wordle-game/WordleGame'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { NUMBER_OF_GUESSES } from '../wordle-game/WordleLogic';
import { format } from 'date-fns';



ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
    
}

export type GameWithScores = Game & { scores: { id: number, word: string, score: number, wordCount: number }[] };

const UserStats: React.FC<Props> = () => {
    let navigate = useNavigate();
    const [games, setGames] = useState<(GameWithScores)[]>([])

    useEffect(() => {
        axios.get('/games').then((res) => setGames(res.data))
    }, [])

    const values = games?.filter(game =>
        game?.guesses.length > 0 &&
        (
            game?.guesses.slice().pop().word === game.correctWord ||
            game?.guesses.length === 6
        )
    ).map(game => ({
        game,
        x: format(new Date(game.createdAt), 'dd/MM/yy HH:mm'),
        y: game.guesses.length === 6 ? 6 + (game.scores.slice().pop().wordCount / 12974 * 100) : game.guesses.length
    }))

    return (
        <Line options={{
            responsive: true,
            onClick: (event, elements, chart)=> {
                const index = elements[0]?.index

                if(!index) return

                const gameId = values[index].game.id

                navigate('/games/' + gameId)
            },
            plugins: {
                legend: {
                    position: 'top' as const,
                },
                title: {
                    display: true,
                    text: 'Player Games',
                },
                tooltip: {
                    callbacks: {
                        title: (tooltipItem) => {
                            return (tooltipItem[0].raw as ({ x: string, y: number, game: GameWithScores })).game.correctWord
                        },
                        label: (tooltipItem) => {
                            const game = (tooltipItem.raw as ({ x: string, y: number, game: GameWithScores })).game
                            return `${game.guesses.length} Guesses ${(game.guesses.length === 6 && game.scores.slice().pop().wordCount !== 1)
                                    ? `+ ${game.scores.slice().pop().wordCount} Wrong words left`
                                    : ''
                                }`
                        },
                    }
                }
            },
        }} data={{
            labels: values?.map(game => game.x),
            datasets: [
                {
                    label: 'Score',
                    data: values,
                    borderColor: context=> {
                        if(!context.raw) return 'lightblue'
                        const game = (context.raw as ({ x: string, y: number, game: GameWithScores })).game
                        return (game.guesses.length === 6 && game.scores.slice().pop().wordCount !== 1) ? 'red' : 'forestgreen'
                    },
                    backgroundColor: context=> {
                        if(!context.raw) return 'lightblue'
                        const game = (context.raw as ({ x: string, y: number, game: GameWithScores })).game
                        return (game.guesses.length === 6 && game.scores.slice().pop().wordCount !== 1) ? 'red' : 'forestgreen'
                    },
                    pointRadius: 10,
                    pointHoverRadius: 15
                }
            ],
        }} />
    );
};

export default hot(module)(UserStats);
