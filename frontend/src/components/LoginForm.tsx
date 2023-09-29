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
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    return (
        <div className="form-container">
            <form action="#" onSubmit={submithandler}>
                <div>
                    <input  {...register("email", {
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Введите почту в формате user@example.com"
                        },
                        required: {
                            value: true,
                            message: 'Поле не может быть пустым'
                        },
                    },)} onChange={e => setEmail(e.target.value)} placeholder='Email' className='text-field-input'/>
                    {errors.email && <p className='error-alert' role="alert">{errors.email.message}</p>}

                </div>
                <div>
                    <input {...register('password', {
                        required: {
                            value: true,
                            message: 'Поле не может быть пустым'
                        },
                    })} name="password" placeholder='Password' type={passwordShown ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className='text-field-input'/>
                    {errors.password && <p className='error-alert' role="alert">{errors.password.message}</p>}

                </div>
                <div className="show-password-container">
                    <b >Показать пароль</b>
                    <input className='show-password' type="checkbox" onClick={togglePasswordVisiblity} />
                </div>
                <button className='form-button' type='submit'>Войти</button>
            </form>
            {auth_store.loginError ? <><h1>Неверный логин или пароль</h1></> : null}
        </div>
    )
}


export default observer(LoginForm);