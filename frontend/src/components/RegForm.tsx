import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form"
import { error } from 'console';
import { useNavigate } from 'react-router-dom';

type FormData = {
    email: string
    password: string
    confPassword: string
    username: string
    name: string
}

const RegForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confPassword, setConfPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');

    const { auth_store } = useContext(Context);
    const { user_store } = useContext(Context);
    let navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({ mode: 'onChange' })

    const onSubmit: SubmitHandler<FormData> = (data) => {
        auth_store.registr(email, password, username, name)
        navigate("/login");

    }
    const error: SubmitErrorHandler<FormData> = (data) => console.log(data)

    const uniqEmail = (email: string) => {
        user_store.FindUserEmail(email)
        if (user_store.anotherUser2.email === email) {
            return false
        }
        return true;
    };
    const uniqUsername = (username: string) => {
        user_store.FindUser(username)
        if (user_store.anotherUser.username === username) {
            return false
        }
        return true;
    };
    const confPasswordCheck = () => {
        if (password !== confPassword) {
            return false;
        }
        return true
    };

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    return (
        <div className="form-container">
            <form action="#" onSubmit={handleSubmit(onSubmit, error)}>
                <input  {...register("email", {
                    validate: uniqEmail,
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Введите почту в формате user@example.com"
                    },
                    required: {
                        value: true,
                        message: 'Поле не может быть пустым'
                    },
                },)} onChange={e => setEmail(e.target.value)} placeholder='Email' className='text-field-input' />

                {errors.email && <p className='error-alert' role="alert">{errors?.email?.message ||"Пользователь с такой почтой существует"}</p>}


                <input  {...register("username", {
                    validate: uniqUsername,
                    required: {
                        value: true,
                        message: 'Поле не может быть пустым'
                    },
                    minLength: {
                        value: 3,
                        message: 'Имя пользователя не может быть короче 3 символов'
                    }
                },)} onChange={e => setUsername(e.target.value)} placeholder='Username' className='text-field-input' />
                {errors.username && <p className='error-alert' role="alert">{errors?.username?.message ||"Пользователь с таким именем существует"}</p>}


                <input {...register("name", {
                    required: {
                        value: true,
                        message: "Поле не может быть пустым"
                    },
                    minLength: {
                        value: 2,
                        message: 'Имя пользователя не может быть короче 2 символов'
                    }
                })} onChange={e => setName(e.target.value)} placeholder='Name' className='text-field-input' />
                {errors.name && <p className='error-alert' role="alert">{errors?.name?.message}</p>}

                <input type={passwordShown ? "text" : "password"} {...register("password", {
                    required: {
                        value: true,
                        message: "Поле не может быть пустым"
                    },
                    minLength: {
                        value: 8,
                        message: 'Придумайте надёжный пароль'
                    }
                })} onChange={e => setPassword(e.target.value)} placeholder='Password' className='text-field-input' />
                {errors.password && <p className='error-alert' role="alert">{errors?.password?.message || "Пароли не совпадают"}</p>}


                <input type={passwordShown ? "text" : "password"} {...register("confPassword", {
                    validate: confPasswordCheck,
                    required: {
                        value: true,
                        message: "Поле не может быть пустым"
                    },
                })} onChange={e => setConfPassword(e.target.value)} placeholder='Confirm Password' className='text-field-input' />
                {errors.confPassword && <span role="alert">{errors?.confPassword?.message || <p>Пароли не совпадают</p>}</span>}
                {errors.confPassword && <p className='error-alert' role="alert">{errors?.confPassword?.message}</p>}

                <div className="show-password-container">
                    <b >Показать пароль</b>
                    <input className='show-password' type="checkbox" onClick={togglePasswordVisiblity} />
                </div>
                <button className='form-button' type='submit'>Зарегистрироваться</button>
            </form>
        </div>
    )
}


export default observer(RegForm);