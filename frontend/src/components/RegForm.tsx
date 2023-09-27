import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from 'react-router-dom';

type FormData = {
    email: string
    password: string
    confirmPassword: string
    username: string
    name: string
}

const RegForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');

    const { auth_store } = useContext(Context);
    const { user_store } = useContext(Context);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({ mode: 'onBlur' })
    let navigate = useNavigate();

    const submithandler = handleSubmit(() => {
        const resp = auth_store.registr(email, password, username, name);
        console.log(auth_store.emailError)
        console.log(auth_store.usernameError)
        if (auth_store.emailError && auth_store.usernameError) {
            console.log("регистрация прошла успешно")
        }
    })
    useEffect(() => {
        console.log(auth_store.emailError, auth_store.usernameError)
    }, [])

    return (
        <div>
            <form action="#" onSubmit={submithandler}>
                <div>
                    <label htmlFor="login">Email</label>
                    <input
                        placeholder='Email'
                        id="email"
                        {...register("email", {
                            required: "required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Entered value does not match email format",
                            },
                        })}
                        type="email"
                        value={email} onChange={e => setEmail(e.target.value)}
                    />
                    {errors.email && <span role="alert">{errors.email.message}</span>}                </div>
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
                <button type='submit'>Зарегистрироваться</button>
                {!auth_store.emailError ? <><h1>Пользователь с такой почтой существует</h1></> : null}
                {!auth_store.usernameError ? <><h1>Пользователь с таким ником существует</h1></> : null}

            </form>
        </div>
    )
}

export default observer(RegForm);