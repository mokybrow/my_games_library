import { FC, useCallback, useContext, useEffect, useState } from 'react'
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form"

import ListService from '../service/ListService';
import { useDropzone } from 'react-dropzone';

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
    // const { auth_store } = useContext(Context);
    const { list_store } = useContext(Context);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confPassword, setConfPassword] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const { auth_store } = useContext(Context);
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
        console.log(acceptedFiles[0])
        if (!acceptedFiles[0]) {
            list_store.CreateList(title, desctiption, isPrivate, null)
        }else{
            list_store.CreateList(title, desctiption, isPrivate, String(acceptedFiles[0]))

        }
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
        <form action="#" onSubmit={handleSubmit(onSubmit, error)} className='list-create-form'>
            <div className="list-create-input-container">
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
                    })} onChange={e => setTitle(e.target.value)} placeholder='Name' className='user-settings-text-field-input' />
                {errors.name && <p className='error-alert' role="alert">{errors?.name?.message || "Вы уже создавали список с таким именем"}</p>}

            </div>
            <div className="list-create-input-container">
                <input
                    {...register("desctiption", {

                        minLength: {
                            value: 20,
                            message: 'Описание должно быть длиннее 20 симоволов'
                        }
                    })} onChange={e => setDesctiption(e.target.value)} placeholder='Description' className='user-settings-text-field-input' />
                {errors.desctiption && <p className='error-alert' role="alert">{errors?.desctiption?.message}</p>}
            </div>
            <div className="list-private-container">
                <p>Приватный список</p>
                <input className='show-password' type="checkbox" onClick={() => setIsPrivate(!isPrivate)} />
            </div>
            <div className="upload-field-container-form">
                <div {...getRootProps()} className='upload-list-cover-filed-container'>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Да-да, бросай его сюда...</p> :
                            <p>Нажмите на поле или перетащите в него фото, которое хотите установить для списка</p>
                    }
                </div>

                {preview && (

                    <div className="list-create-cover-container">
                        <img src={preview as string} alt="Upload preview" />
                    </div>
                )}
            </div>
            <div className="list-create-input-container">
                <button className='settings-form-button' type='submit'>Создать список</button>

            </div>

        </form>
    )

}


export default observer(ListCreateForm);