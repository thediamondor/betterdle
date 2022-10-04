import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import logo from '@assets/images/logo.png';
import './Application.less';
import Navbar from '../navbar/Navbar';
import { HashRouter } from 'react-router-dom';
import { Route, Routes, useRoutes } from 'react-router';
import WordleGame from '../wordle-game/WordleGame';
import { Guess } from '@src/models/User';
import DailyWordle from '../daily-wordle/DailyWordle';
import PracticeWordle from '../practice-wordle/PracticeWordle';
import UserStats from '../user-stats/UserStats';
import GameStats from '../game-stats/GameStats';

type Props = {
  title: string;
  version: string;
};

const Application: React.FC<Props> = (props) => {
  const routes = useRoutes([
    {
      path:'daily',
      element: <DailyWordle  />
    },
    {
      path: 'practice',
      element: <PracticeWordle  />
    },
    {
      path: 'statistics',
      element: <UserStats />
    },
    {
      path: 'games/:gameId',
      element: <GameStats />
    }
])

  return (
    <>
      <React.Suspense fallback={<div>loading</div>}>
        
          <div id="navbar">
            <Navbar user={{ email: '', firstName: 'Or', lastName: 'Yedidia', id: 1 }}></Navbar>
          </div>
          <div id="containerBelow">

            <div id="sidebar">

            </div>
            <div id="mainContent">
              {routes}
              {/* <WordleGame gameId={4} user={{ email: '', firstName: 'Or', lastName: 'Yedidia', id: 1 }} ></WordleGame> */}
            </div>
          </div>
      </React.Suspense>
    </>
  );
};

export default hot(module)(Application);
