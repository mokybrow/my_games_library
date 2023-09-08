import React, { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:8000 ";


export const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault()
        console.log(JSON.stringify({
            username: email,
            password: password
        }))
        await fetch('http://localhost:8000/auth/login', {
            method: "POST",
            headers: { 'accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
            credentials: 'include',
            body: JSON.stringify({
                username: email,
                password: password
            })
        })
        navigate("/");

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
