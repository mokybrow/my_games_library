import React, { FC, useCallback, useContext, useState } from 'react'
import './list-create-form.css'
import { useDropzone } from 'react-dropzone';
import UserService from '../../services/user-service';
import { SubmitButton } from '../buttons/submit-button';
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form"
import { Context } from '../..';

interface IFormInput {
    title: string
    description: string | null
    isPrivate: boolean
}

export const ListCreateForm: FC = () => {
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

    const { list_store } = useContext(Context);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        if (data.description = ''){
            data.description = null
        }
        console.log(data)
        if (!acceptedFiles[0]) {
            console.log('фотки нет')
            list_store.CreateList(data.title, data.description, data.isPrivate, '')
        } else {
            list_store.CreateList(data.title, data.description, data.isPrivate, acceptedFiles[0])

        }
        // window.location.reload();
        if (typeof acceptedFiles[0] === 'undefined') return;
    }
    const onDrop = useCallback((acceptedFiles: Array<File>) => {
        const file = new FileReader();

        file.onload = function () {
            setPreview(file.result);
        }
        file.readAsDataURL(acceptedFiles[0])
    }, [])

    const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop
    });

    const clearPhoto = () => {
        setPreview(null)
    }
    return (

        <form action="#" onSubmit={handleSubmit(onSubmit)} className='list-create-form-container'>
            <label htmlFor="username">Название списка:</label>
            <input {...register("title", {
                required: {
                    value: true,
                    message: 'Поле не может быть пустым'
                },
                pattern: {
                    value: /^[a-zA-Zа-яА-Я ]+$/,
                    message: "Вы ввели недопустимые символы"
                },
                minLength: {
                    value: 3,
                    message: 'Название списка должно быть длиннее 3 букв'
                }
            },)}
                type="text" id="title" name="title" />
            {errors.title && <p role="alert">{errors.title.message}</p>}

            <label htmlFor="username">Описание:</label>
            <textarea {...register("description", {
                pattern: {
                    value: /^[a-zA-Zа-яА-Я ]+$/,
                    message: "Вы ввели недопустимые символы"
                },
                minLength: {
                    value: 10,
                    message: 'Придумайте описание подлиннее '
                },
                maxLength: {
                    value: 150,
                    message: 'Описание не должно быть длинее 150 символов'
                }
            },)}
                id="description" name="description" />
            {errors.description && <p role="alert">{errors.description.message}</p>}

            <div className="upload-field-container-form list">
                <div {...getRootProps()} className='upload-filed-container'>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Да-да, бросай его сюда...</p> :
                            <p>Нажмите на поле или перетащите в него фото, которое хотите установить</p>
                    }
                </div>

                {preview && (

                    <div className="list-cover-container">
                        <img src={preview as string} alt="Upload preview" />
                    </div>

                )}
            </div>
            <div className="buttons-container">
                <SubmitButton type={'submit'} onClick={undefined}>
                    Создать список
                </SubmitButton>
                <SubmitButton type={'reset'} onClick={clearPhoto}>
                    Очистить
                </SubmitButton>
            </div>
        </form>
    )
}