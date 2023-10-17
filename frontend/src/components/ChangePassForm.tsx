import { FC, useContext, useState } from 'react'
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { useForm } from "react-hook-form"
import AuthService from '../service/AuthService';

type FormData = {
    currentPassword: string
    password: string
    confPassword: string
}

const ChangePassForm: FC = () => {
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confPassword, setConfPassword] = useState<string>('');
    const { auth_store } = useContext(Context);
    const [passwordShown, setPasswordShown] = useState(false);


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({ mode: 'onSubmit' })

    const submithandler = handleSubmit(async () => {
        console.log(auth_store.loginError)
        await AuthService.changeUserData(password, auth_store.user.name, auth_store.user.surname, auth_store.user.gender)
    })

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const confPasswordCheck = () => {
        if (password !== confPassword) {
            return false;
        }
        return true
    };

    const currentPassCheck = async () => {
        try {
            const response = await AuthService.login(auth_store.user.email, currentPassword)
            if (response.status === 200) {
                return true
            }
        } catch (error) {
            return false
        }
    };

    return (
            <form action="#" onSubmit={submithandler} className='settings-form'>
                <div className="password-container">

                    <input autoComplete="on" 
                    type={passwordShown ? "text" : "password"} 
                    {...register("currentPassword", {
                        validate: currentPassCheck,
                        required: {
                            value: true,
                            message: "Поле не может быть пустым"
                        },

                    })} onChange={e => setCurrentPassword(e.target.value)} placeholder='Current Password' className='user-settings-text-field-input' />
                    {errors.currentPassword && <p className='error-alert-settings' role="alert">{errors?.currentPassword?.message || "Не верный текущий пароль"} </p>}
                </div>

                <div className="password-container">
                    <input 
                    type={passwordShown ? "text" : "password"} 
                    autoComplete="on" 
                    {...register("password", {
                        required: {
                            value: true,
                            message: "Поле не может быть пустым"
                        },
                        minLength: {
                            value: 8,
                            message: 'Придумайте надёжный пароль'
                        }
                    })} onChange={e => setPassword(e.target.value)} placeholder='Password' className='user-settings-text-field-input' />
                    {errors.password && <p className='error-alert-settings' role="alert">{errors?.password?.message || "Пароли не совпадают"}</p>}
                </div>

                <div className="password-container">
                    <input 
                    type={passwordShown ? "text" : "password"} 
                    autoComplete="on" 
                    {...register("confPassword", {
                        validate: confPasswordCheck,
                        required: {
                            value: true,
                            message: "Поле не может быть пустым"
                        },
                    })} onChange={e => setConfPassword(e.target.value)} placeholder='Confirm Password' className='user-settings-text-field-input' />
                    {errors.confPassword && <p className='error-alert-settings' role="alert">{errors?.confPassword?.message || "Пароли не совпадают"}</p>}

                </div>
                <div className="show-password-container">
                    <p>Показать пароль</p>
                    <input className='show-password' type="checkbox" onClick={togglePasswordVisiblity} />
                </div>
                <div className="password-container">
                    <button className='settings-form-button' type='submit'>Изменить данные</button>
                </div>

            </form>

    )
}


export default observer(ChangePassForm);