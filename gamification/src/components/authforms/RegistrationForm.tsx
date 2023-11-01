import { FC, useContext, useState } from 'react'
import './auth-form.css'
import { useForm, SubmitHandler } from "react-hook-form"
import AuthService from '../../services/auth-service'
import { Context } from '../..'
import { useNavigate } from 'react-router-dom'


interface IFormInput {
    firstName: string
    username: string
    email: string
    password: string
    confirmPassword: string
}


export const RegistrationForm: FC = () => {
    const [password, setPassword] = useState<string>('');
    const [confPassword, setConfPassword] = useState<string>('');

    const [passwordShown, setPasswordShown] = useState(false);
    const { auth_store } = useContext(Context);

    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        auth_store.registr(data.email, data.password, data.username, data.firstName)
        navigate("/login");
    }


    const uniqEmail = async (email: string) => {
        try {
            await AuthService.getUserByEmail(email)
            return false

        } catch (error) {
            return true

        }
    };

    const uniqUsername = async (username: string) => {
        try {
            await AuthService.getUserByUsername(username)
            return false

        } catch (error) {
            return true

        }
    };

    const confPasswordCheck = () => {
        if (password !== confPassword) {
            return false;
        }
        return true
    };

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form-container' >
            <label htmlFor="firstName">Имя:</label>
            <input {...register("firstName", {
                required: {
                    value: true,
                    message: "Поле не может быть пустым"
                },

                pattern: {
                    value: /^[a-zA-Zа-яА-Я]+$/,
                    message: "Вы ввели недопустимые символы"
                },
            })}
                type="text" id="firstName" name="firstName" />
            {errors.firstName && <p role="alert">{errors.firstName.message}</p>}

            <label htmlFor="username">Никнейм:</label>
            <input {...register("username", {
                validate: uniqUsername,
                required: {
                    value: true,
                    message: 'Поле не может быть пустым'
                },
                pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message: "Вы ввели недопустимые символы"
                },
                minLength: {
                    value: 3,
                    message: 'Имя пользователя не может быть короче 3 символов'
                }
            },)}
                type="text" id="username" name="username" />
            {errors.username && <p role="alert">{errors.username.message || "Пользователь с таким именем существует"}</p>}

            <label htmlFor="email">Почта:</label>
            <input {...register("email", {
                validate: uniqEmail,
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Введите почту в формате user@example.com"
                },
                required: {
                    value: true,
                    message: 'Поле не может быть пустым'
                },
            },)}
                type="email" id="email" name="email" autoComplete='email' />
            {errors.email && <p role="alert">{errors.email.message || "Пользователь с такой почтой существует"} </p>}

            <label htmlFor="password">Пароль:</label>
            <input {...register("password", {
                required: {
                    value: true,
                    message: "Поле не может быть пустым"
                },
                minLength: {
                    value: 8,
                    message: 'Придумайте надёжный пароль'
                }
            })}
                onChange={e => setPassword(e.target.value)}
                type={passwordShown ? "text" : "password"} id="password" name="password" autoComplete='password' />
            {errors.password && <p className='error-alert' role="alert">{errors?.password?.message || "Пароли не совпадают"}</p>}

            <label htmlFor="confirmPassword">Подтвердите пароль:</label>
            <input {...register("confirmPassword",
                {
                    required: {
                        value: true,
                        message: "Поле не может быть пустым"
                    },
                    validate: confPasswordCheck,
                })}
                onChange={e => setConfPassword(e.target.value)}
                type={passwordShown ? "text" : "password"} id="confirmPassword" name="confirmPassword" autoComplete='confirm-password' />
            {errors.confirmPassword && <p className='error-alert' role="alert">{errors?.confirmPassword?.message || "Пароли не совпадают"}</p>}

            <div className="show-password-container">
                <p>Показать пароль</p>
                <input className='show-password' type="checkbox" onClick={togglePasswordVisiblity} />
            </div>
            <button type="submit">Зарегистрироваться</button>
        </form>
    )
}