import { FC, SyntheticEvent, useContext, useState } from 'react'
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { useForm, SubmitHandler } from "react-hook-form"

type FormData = {
    email: string
    password: string
}

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { auth_store } = useContext(Context);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({ mode: 'onBlur' })

    const submithandler = handleSubmit(() => {
        auth_store.login(email, password)
        console.log(auth_store.loginError)
    })


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
                    {errors.email && <span role="alert">{errors.email.message}</span>}

                </div>
                <div>

                    <label htmlFor="password">Password</label>
                    <input {...register('password', {required: "required",})} name="password" placeholder='password' type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    {errors.password && <span role="alert">{errors.password.message}</span>}

                </div>
                <button type='submit'>Login</button>
            </form>
            {auth_store.loginError ? <><h1>Неверный логин или пароль</h1></> : null}
        </div>
    )
}


export default observer(LoginForm);