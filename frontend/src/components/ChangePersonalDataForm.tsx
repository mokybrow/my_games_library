import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { useForm } from "react-hook-form"
import AuthService from '../service/AuthService';


type FormData = {
    Name: string
    Surname: string
}

const ChangePersonalDataForm: FC = () => {
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [sex, setSex] = useState<string>('');

    const { auth_store } = useContext(Context);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({ mode: 'onSubmit' })


    const personalDataHandle = handleSubmit(async () => {

        await AuthService.changeUserData(' ', name, surname, sex)

        window.location.reload();

    })

    return (
        <form action="#" onSubmit={personalDataHandle} className='settings-form'>
            <div className="password-container">
                <input type="text"
                    {...register("Name", {
                        minLength: {
                            value: 2,
                            message: 'Имя должно быть минимум два символа'
                        },
                        required: {
                            value: true,
                            message: "Поле не может быть пустым"
                        }
                    })}
                    onChange={e => setName(e.target.value)}
                    placeholder={auth_store.user.name}
                    className='user-settings-text-field-input' />
                {errors.Name && <p className='error-alert-settings' role="alert">{errors?.Name?.message } </p>}
            </div>

            <div className="password-container">
                <input type="text"
                    {...register("Surname", {

                    })}
                    onChange={e => setSurname(e.target.value)}
                    placeholder={auth_store.user.surname || "Surname"}
                    className='user-settings-text-field-input' />
                {errors.Surname && <p className='error-alert-settings' role="alert">{errors?.Surname?.message}</p>}
            </div>
            <div className="password-container">
                <select name="hero" onChange={e => setSex(e.target.value)} className="select-css" >
                    <option>Пол</option>
                    <option selected={auth_store.user.gender == 'male' ? true : false} value="male">Мужской</option>
                    <option selected={auth_store.user.gender == 'female' ? true : false} value="female">Женский</option>
                </select>
            </div>
            <div className="password-container">
                <button className='settings-form-button' type='submit'>Изменить данные</button>
            </div>

        </form>

    )
}


export default observer(ChangePersonalDataForm);