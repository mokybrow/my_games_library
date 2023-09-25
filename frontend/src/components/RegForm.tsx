import { FC, useContext, useState } from 'react'
import { Context } from '..';
import { observer } from 'mobx-react-lite';



const RegForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');

    const {store} = useContext(Context);

    return (
        <div>

                <div>
                    <label htmlFor="login">Email</label>
                    <input name="login" placeholder='email' type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input name="password" placeholder='password' type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="username">username</label>
                    <input name="username" placeholder='username' type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="name">name</label>
                    <input name="name" placeholder='name' type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <button onClick={()=> store.registr(email, password, username, name)}>Login</button>

        </div>
    )
}

export default observer(RegForm);