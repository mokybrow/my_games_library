import React, { SyntheticEvent, useState } from 'react'
import { api } from '../../api/api';
import { saveLocalToken } from '../../api/utils';
import { useNavigate } from 'react-router-dom';


export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const response = await api.logInGetToken(email, password)
        console.log(response.data.access_token)
        const token = response.data.access_token
        if (token){
            saveLocalToken(token);
            navigate("/");
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="login">Email</label>
                    <input name="login" placeholder='email' type="email" value={email} onChange={e => setEmail(e.target.value)} />
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
