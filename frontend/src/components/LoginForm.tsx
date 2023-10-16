import { FC, useContext, useState } from 'react'
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { useForm} from "react-hook-form"

type FormData = {
    email: string
    password: string
}

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { auth_store } = useContext(Context);
    const [passwordShown, setPasswordShown] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({ mode: 'onBlur' })

    const submithandler = handleSubmit(() => {
        auth_store.login(email, password)
    })
    
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    return (
        <div className="form-container">
            <form action="#" onSubmit={submithandler}>
                <div>
                    <input autoComplete="on"  {...register("email", {
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
                    <input autoComplete="on"  {...register('password', {
                        required: {
                            value: true,
                            message: 'Поле не может быть пустым'
                        },
                    })} name="password" placeholder='Password' type={passwordShown ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className='text-field-input'/>
                    {errors.password && <p className='error-alert' role="alert">{errors.password.message}</p>}

                </div>
                {auth_store.loginError ? <p className='error-alert' role="alert">Неверный логин или пароль</p>: null}

                <div className="show-password-container">
                    <p >Показать пароль</p>
                    <input className='show-password' type="checkbox" onClick={togglePasswordVisiblity} />
                </div>
                
                <button className='form-button' type='submit'>Войти</button>

            </form>
            
        </div>
    )
}


export default observer(LoginForm);