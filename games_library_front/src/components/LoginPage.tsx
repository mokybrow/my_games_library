import React, { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';



export const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault()
        const response = await api.loginRequest(email, password);

        navigate("/profile");

    }

    return (
        <>
            <div>LoginPage</div>
            <form onSubmit={submitHandler}>
                <label htmlFor="username">Username</label>

                <input placeholder='Email' type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password</label>

                <input placeholder='password' type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button type='submit'>Login</button>
            </form>
        </>
    )
}
