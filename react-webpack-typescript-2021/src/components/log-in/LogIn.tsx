import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import './Login.less';

interface Props {
    setLoggedIn: (loggedIn: boolean) => void
}

const Login: React.FC<Props> = ({ setLoggedIn }) => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const submit = () => {
        axios.post('/users/signIn', { email, password }).then(() => setLoggedIn(true))
    }

    return (
        <div className='logInContainer'>
            <div className='formContainer'>
                <div className="container">
                    <div className="label">Email: </div>
                    <input type="text" className="input" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                </div>
                <div className="container">
                    <div className="label">Password: </div>
                    <input type="password" className="input" value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                </div>
                <button id="submit" onClick={submit}>Submit</button>
                <a href='#/signUp' id="signUpLink">Sign Up</a>
            </div>
        </div>
    );
};

export default hot(module)(Login);
