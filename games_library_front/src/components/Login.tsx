import React, { FormEvent, useState } from 'react'
import { loginUser } from '../store/auth/LoginReducer';
import { userAppDispatch } from '../store';

export const Login = () => {
    const dispatch = userAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        dispatch(loginUser({email, password}));
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="login">Email</label>
                    <input name="login" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}
function dispatch(login: (params: import("../api/auth/types").ILoginRequest) => import("axios").AxiosPromise<import("../api/auth/types").ILoginResponse>) {
    throw new Error('Function not implemented.');
}

