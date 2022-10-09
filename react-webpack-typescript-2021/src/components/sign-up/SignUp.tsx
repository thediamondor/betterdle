import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import './SignUp.less';

interface Props {
    setLoggedIn: (loggedIn: boolean) => void
}

const SignUp: React.FC<Props> = ({ setLoggedIn }) => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')

    const submit = () => {
        axios.post('/users/signUp', { email, password, lastName, firstName }).then(() => setLoggedIn(true))
    }

    return (
        <div className='logInContainer'>
            <div className='formContainer'>
                <div className="container">
                    <div className="label">First Name: </div>
                    <input type="text" className="input" value={firstName} onChange={(e) => { setFirstName(e.target.value) }}></input>
                </div>
                <div className="container">
                    <div className="label">Last Name: </div>
                    <input type="text" className="input" value={lastName} onChange={(e) => { setLastName(e.target.value) }}></input>
                </div>
                <div className="container">
                    <div className="label">Email: </div>
                    <input type="text" className="input" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                </div>
                <div className="container">
                    <div className="label">Password: </div>
                    <input type="password" className="input" value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                </div>
                <button id="submit" onClick={submit}>Submit</button>
            </div>
        </div>
    );
};

export default hot(module)(SignUp);
