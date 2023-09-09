import React, { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { api } from '../api/api';




export const SignUpPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    const navigate = useNavigate();

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault()
        //взаимодействие с бекендом 

        const response = await api.registerRequest(email, password, username, name);
        console.log(response)


        navigate("/login");
    }

    return (
        <>
            <div>SignUpPage</div>
            <form onSubmit={submitHandler}>
                <input placeholder='Email' type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />


                <input placeholder='password' type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />


                <input placeholder='username' type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />


                <input placeholder='name' type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />


                <input placeholder='surname' type="text"
                    value={surname}
                    onChange={e => setSurname(e.target.value)}
                />

                <button type='submit'>SignUp</button>
            </form>
        </>
    )
}
