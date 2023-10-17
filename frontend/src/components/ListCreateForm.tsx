import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form"
import { error } from 'console';
import { useNavigate } from 'react-router-dom';
import AuthService from '../service/AuthService';
import ListService from '../service/ListService';

type FormData = {
    description: string
    name: string
}

const ListCreateForm: FC = () => {
    const [desctiption, setDescription] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [isPrivate, setIsPrivate] = useState<boolean>(false);

    const { auth_store } = useContext(Context);


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({ mode: 'onBlur' })

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const response = await ListService.createList(name, desctiption, isPrivate);

    }

    const error: SubmitErrorHandler<FormData> = (data) => console.log(data)

    const uniqEmail = async (email: string) => {
        try {
            const response = await AuthService.getUserbyEmail(email)
            if (response.data.result === true) {
                console.log(response.data.result)
                return true
            }
            return false

        } catch (error) {
        }
    };
    
    const uniqUsername = async (username: string) => {
        try {
            const response = await AuthService.getUserbyUsername(username)
            if (response.data.username) {
                return true
            }
            return false

        } catch (error) {
        }
    };


    const uniqListName = async (name: string) => {
        try {
            console.log(name)
            const response = await ListService.checkUniqListname(name);
            if (response.data.list_created === false) {
                console.log(response.data.list_created)
                return true
            }


        } catch (error) {
            return false
        }
    };

    return (
        <div className="form-container">
            <form action="#" onSubmit={handleSubmit(onSubmit, error)} className='list-create-form'>
            <div className="list-create-input-container">

                <input  {...register("name", {
                    validate: uniqListName,
                    required: {
                        value: true,
                        message: 'Поле не может быть пустым'
                    },
                },)} onChange={e => setName(e.target.value)} placeholder='Email' className='user-settings-text-field-input'  />

                {errors.name && <p className='error-alert' role="alert">{errors?.name?.message || "Вы уже создавали такой список"}</p>}

                </div>
                <div className="list-create-input-container">

                <input  
                {...register("description", {
                    minLength: {
                        value: 3,
                        message: 'Название списка не может быть короче 3 символов'
                    }
                },)} onChange={e => setDescription(e.target.value)} placeholder='Username' className='user-settings-text-field-input'  />
                {errors.description && <p className='error-alert' role="alert">{errors?.description?.message || "Пользователь с таким именем существует"}</p>}

                </div>

                <button className='form-button' type='submit'>Зарегистрироваться</button>
            </form>
        </div>
    )
}


export default observer(ListCreateForm);