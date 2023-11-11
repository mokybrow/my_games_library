import { FC, useContext, useState } from 'react'
import './auth-form.css'
import { useForm, SubmitHandler } from "react-hook-form"
import AuthService from '../../services/auth-service'
import { Context } from '../..'
import { useNavigate } from 'react-router-dom'
import { SubmitButton } from '../buttons/submit-button'


interface IFormInput {
    email: string
    password: string
}

export const LoginForm: FC = () => {

    const [passwordShown, setPasswordShown] = useState(false);
    const [email, setEmail] = useState('');
    const [password, SetPassword] = useState('');

    const { auth_store } = useContext(Context);

    const navigate = useNavigate();


    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        getValues,
        
    } = useForm<IFormInput>({ mode: "onSubmit" })

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        auth_store.login(data.email, data.password)
        navigate("/");
    }

    const validateData = async () => {
        try {
            await AuthService.login(email, password)
            return true

        } catch (error) {
            return false

        }
    };


    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form-container' >

            <label htmlFor="email">Почта:</label>
            <input {...register("email", {
                validate: validateData,
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Введите почту в формате user@example.com"
                },
                required: {
                    value: true,
                    message: 'Поле не может быть пустым'
                },
            },)}
                onChange={(e) => setEmail(e.target.value)}
                type="email" id="email" name="email" autoComplete='email' />
            {errors.email && <p role="alert">{errors.email.message} </p>}

            <label htmlFor="password">Пароль:</label>
            <input {...register("password", {
                validate: validateData,
                required: {
                    value: true,
                    message: "Поле не может быть пустым"
                },
            })}
                onChange={(e) => SetPassword(e.target.value)}
                type={passwordShown ? "text" : "password"} id="password" name="password" autoComplete='password' />

            {errors.password && <p className='error-alert' role="alert">{errors?.password?.message || "Неверный логин или пароль"}</p>}


            <div className="show-password-container">
                <p>Показать пароль</p>
                <input className='show-password' type="checkbox" onClick={togglePasswordVisiblity} />
            </div>
            <SubmitButton  type={"submit"} onClick={undefined}>
                Вход
            </SubmitButton>

        </form>
    )
}