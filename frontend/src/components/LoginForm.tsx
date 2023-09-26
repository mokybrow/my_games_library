import { FC, useContext, useState } from 'react'
import { Context } from '..';
import { observer } from 'mobx-react-lite';



const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { auth_store } = useContext(Context);

    return (
        <div>
            <form >
                <div>
                    <label htmlFor="login">Email</label>
                    <input name="email" placeholder='email' type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input name="password" placeholder='password' type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button onClick={() => auth_store.login(email, password)} >Login</button>
            </form>

        </div>
    )
}


export default observer(LoginForm);