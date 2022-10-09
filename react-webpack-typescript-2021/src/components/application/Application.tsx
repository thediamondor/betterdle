import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import logo from '@assets/images/logo.png';
import './Application.less';
import Navbar from '../navbar/Navbar';
import { HashRouter } from 'react-router-dom';
import { Navigate, Route, Routes, useRoutes } from 'react-router';
import WordleGame from '../wordle-game/WordleGame';
import { Guess } from '@src/models/User';
import DailyWordle from '../daily-wordle/DailyWordle';
import PracticeWordle from '../practice-wordle/PracticeWordle';
import UserStats from '../user-stats/UserStats';
import GameStats from '../game-stats/GameStats';
import axios from 'axios';
import Cookies from 'js-cookie'
import LogIn from '../log-in/LogIn';
import SignUp from '../sign-up/SignUp';

type Props = {
  title: string;
  version: string;
};



const Application: React.FC<Props> = (props) => {


  const routes = useRoutes([
    {
      path: 'daily',
      element: <DailyWordle />
    },
    {
      path: 'practice',
      element: <PracticeWordle />
    },
    {
      index: true,
      path: 'statistics',
      element: <UserStats />
    },
    {
      path: 'games/:gameId',
      element: <GameStats />
    },
    {
      path: '*',
      element: <Navigate to='statistics'></Navigate>
    }
  ])

  const [loggedIn, setLoggedIn] = useState<boolean>(!!Cookies.get('jwt'))

  const logInRoutes = useRoutes([
    {
      path: 'logIn',
      element: <LogIn setLoggedIn={setLoggedIn} />
    },
    {
      path: 'signUp',
      element: <SignUp setLoggedIn={setLoggedIn} />
    },
    {
      path: '*',
      element: <Navigate to='logIn'></Navigate>
    }
  ])

  useEffect(() => {
    axios.interceptors.response.use((response) => {
      if (response.status === 511) {
        setLoggedIn(false)
        location.reload()
      }
      return response
    })
  }, [])

  return (
    loggedIn
      ? (<>
        <React.Suspense fallback={<div>loading</div>}>

          <div id="containerBelow">

            <div id="sidebar">
              <div id="navbar">
                <Navbar user={{ email: '', firstName: 'Or', lastName: 'Yedidia', id: 1 }}></Navbar>
              </div>

            </div>
            <div id="mainContent">
              {routes}
            </div>
          </div>
        </React.Suspense>
      </>)
      : (
        logInRoutes
      )
  );
};

export default hot(module)(Application);
