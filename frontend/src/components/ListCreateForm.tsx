import { FC, useCallback, useContext, useEffect, useState } from 'react'
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form"

import ListService from '../service/ListService';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

// type FormData = {
//     name: string
//     desctiption: string
// }

type FormData = {
    email: string
    password: string
    confPassword: string
    username: string
    name: string
    desctiption: string
}

const ListCreateForm: FC = () => {
    const [desctiption, setDesctiption] = useState<string>('');
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const { list_store } = useContext(Context);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const [title, setTitle] = useState<string>('');
    const { auth_store } = useContext(Context);
    let navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({ mode: 'onBlur' })

    const onDrop = useCallback((acceptedFiles: Array<File>) => {
        const file = new FileReader;

        file.onload = function () {
            setPreview(file.result);
        }

        file.readAsDataURL(acceptedFiles[0])
    }, [])

    const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop
    });


    const onSubmit: SubmitHandler<FormData> = (data) => {

        if (!acceptedFiles[0]) {
            console.log('фотки нет')
            list_store.CreateList(title, desctiption, isPrivate, '')
        } else {
            list_store.CreateList(title, desctiption, isPrivate, acceptedFiles[0])

        }
        navigate(`/${auth_store.user.username}`)
        if (typeof acceptedFiles[0] === 'undefined') return;
    }

    const error: SubmitErrorHandler<FormData> = (data) => {

    }

    const uniqListName = async (title: string) => {
        try {
            const response = await ListService.approveCreateList(title);
            if (response.data.detail === true) {
                return true
            }

        } catch (error) {
            return false
        }
    };



    return (

        <form action="#" onSubmit={handleSubmit(onSubmit, error)} className='data-form-style' >
            <input
                {...register("name", {
                    validate: uniqListName,
                    required: {
                        value: true,
                        message: "Поле не может быть пустым"
                    },
                    minLength: {
                        value: 2,
                        message: 'Название списка не может быть короче 2 символов'
                    }
                })} onChange={e => setTitle(e.target.value)} placeholder='Название' className='text-field-input' />
            {errors.name && <p className='error-alert' role="alert">{errors?.name?.message || "Вы уже создавали список с таким именем"}</p>}

            <input
                {...register("desctiption", {

                    minLength: {
                        value: 20,
                        message: 'Описание должно быть длиннее 20 симоволов'
                    }
                })} onChange={e => setDesctiption(e.target.value)} placeholder='Описание' className='text-field-input' />
            {errors.desctiption && <p className='error-alert' role="alert">{errors?.desctiption?.message}</p>}

            <div className="show-password-container">
                <p>Приватный список</p>
                <input className='show-password' type="checkbox" onClick={() => setIsPrivate(!isPrivate)} />
            </div>

            <div className="upload-field-container-form">
                <div {...getRootProps()} className='upload-filed-container'>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Да-да, бросай его сюда...</p> :
                            <p>Нажмите на поле или перетащите в него фото, которое хотите установить</p>
                    }
                </div>

                {preview && (

                    <div className="list-create-cover-container">
                        <img src={preview as string} alt="Upload preview" />
                    </div>

                )}
            </div>


            <button className='data-form-button' type='submit'>Создать список</button>


        </form>

    )

}


export default observer(ListCreateForm);