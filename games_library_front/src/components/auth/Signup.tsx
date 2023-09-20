import React, { SyntheticEvent, useState } from 'react'
import { api } from '../../api/api';
import { useNavigate } from 'react-router-dom';


export const Signup = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const response = await api.SignupGetToken(email, password, username, name)

        navigate("/login");
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="login">Email</label>
                    <input name="login" placeholder='email' type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input name="username" placeholder='username' type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input name="name" placeholder='name' type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input name="password" placeholder='password' type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
