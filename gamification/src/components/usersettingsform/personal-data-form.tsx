import { FC, useContext, useEffect, useState } from 'react'
import './user-settings-form.css'
import { useForm, SubmitHandler } from "react-hook-form"
import AuthService from '../../services/auth-service'
import { Context } from '../..'
import { useNavigate } from 'react-router-dom'
import UserService from '../../services/user-service'
import { SubmitButton } from '../buttons/submit-button'
import { observer } from 'mobx-react-lite'


enum GenderEnum {
    female = "female",
    male = "male",
    other = "other"
}

interface IFormInput {
    name: string
    surname: string
    gender: GenderEnum;
}

const PersonalDataForm: FC = () => {
    const { auth_store } = useContext(Context);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        await UserService.changeUserData(undefined, data.name, data.surname, data.gender)
        window.location.reload();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='user-settings-form-container' >

            <label htmlFor="name">Имя:</label>
            <input {...register("name", {
                required: {
                    value: true,
                    message: "Поле не может быть пустым"
                },
                pattern: {
                    value: /^[a-zA-Zа-яА-Я]+$/,
                    message: "Вы ввели недопустимые символы"
                },
            })}
                defaultValue={auth_store.user.name}
                id="name" name="name" autoComplete='name' />
            {errors.name && <p className='error-alert' role="alert">{errors?.name?.message}</p>}

            <label htmlFor="surname">Фамилия:</label>
            <input {...register("surname",
                {
                    pattern: {
                        value: /^[a-zA-Zа-яА-Я]+$/,
                        message: "Вы ввели недопустимые символы"
                    },
                })}
                defaultValue={auth_store.user.surname}
                id="surname" name="surname" autoComplete='surname' />
            {errors.surname && <p className='error-alert' role="alert">{errors?.surname?.message}</p>}
            <label htmlFor="gender">Пол:</label>
            <select {...register("gender")} defaultValue={auth_store.user.gender}>
                <option value="female">male</option>
                <option value="male">female</option>
                <option value="other">other</option>
            </select>
            <SubmitButton type={'submit'} onClick={undefined}>
                Изменить данные
            </SubmitButton>
        </form>
    )
}

export default observer(PersonalDataForm);