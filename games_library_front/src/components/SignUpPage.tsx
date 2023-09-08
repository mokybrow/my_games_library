import React, { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'



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
        await fetch('http://localhost:8000/auth/register/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
                is_active: true,
                is_superuser: false,
                is_verified: false,
                username,
                name,
                surname,
                birthdate: null,
                gender: null,
            }),
        })

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
