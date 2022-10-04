import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import logo from '@assets/images/logo.png';
import { User } from '../../models/User'
import './Navbar.less';
import { Link } from 'react-router-dom';

interface Props {
    user: User
}

export interface NavData {
    path: string;
    displayName: string
}

export const navData: NavData[] = [
    {
        path: 'practice',
        displayName: 'Practice'
    },
    {
        path: 'daily',
        displayName: 'Daily'
    },
    {
        path: 'time-trial',
        displayName: 'Time Trial'
    },
    {
        path: 'statistics',
        displayName: 'Statistics'
    }
]

const Navbar: React.FC<Props> = ({user}) => {
    
    return (
        <>
            <div id='navbarContainer'>
                <div id='navbarLogo'>
                    Betterdle
                </div>
                {navData.map(data=> 
                    <div className='navbarNavButton' key={data.path}>
                        <Link  to={data.path}>{data.displayName}</Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default hot(module)(Navbar);
