import { FC, useContext, useState } from 'react'
import './user-settings-form.css'
import { useForm, SubmitHandler } from "react-hook-form"
import AuthService from '../../services/auth-service'
import { Context } from '../..'
import { useNavigate } from 'react-router-dom'
import UserService from '../../services/user-service'
import { SubmitButton } from '../buttons/submit-button'


interface IFormInput {
    password: string
    confirmPassword: string
}


export const UserSettingsForm: FC = () => {
    const [password, setPassword] = useState<string>('');
    const [confPassword, setConfPassword] = useState<string>('');

    const [passwordShown, setPasswordShown] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        await UserService.changeUserData(data.password)
        window.location.reload();
    }


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
        <form onSubmit={handleSubmit(onSubmit)} className='user-settings-form-container' >

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
            <SubmitButton type={'submit'} onClick={undefined}>
            Зарегистрироваться
            </SubmitButton>
        </form>
    )
}