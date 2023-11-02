import React, { FC, SyntheticEvent, useCallback, useContext, useState } from 'react'
import './list-create-form.css'
import { useDropzone } from 'react-dropzone';
import { SubmitButton } from '../buttons/submit-button';
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form"
import { Context } from '../..';
import ListService from '../../services/list-service';
import { ActionButton } from '../buttons/action-button';
import { observer } from 'mobx-react-lite';

interface IFormInput {
    title: string
    description: string | null
    isPrivate: boolean
}


const ListCreateForm: FC = () => {
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

    const { list_store } = useContext(Context);
    const { auth_store } = useContext(Context);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        if (!acceptedFiles[0]) {
            list_store.CreateList(data.title, data.description, data.isPrivate, '')
        } else {
            list_store.CreateList(data.title, data.description, data.isPrivate, acceptedFiles[0])

        }
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

        <form action="#" onSubmit={handleSubmit(onSubmit)} className='list-create-form-container'>
            <label htmlFor="username">Название списка:</label>
            <input {...register("title", {
                validate: uniqListName,
                required: {
                    value: true,
                    message: 'Поле не может быть пустым'
                },
                pattern: {
                    value: /^[a-zA-Zа-яА-Я 0-9]+$/,
                    message: "Вы ввели недопустимые символы"
                },
                minLength: {
                    value: 3,
                    message: 'Название списка должно быть длиннее 3 букв'
                }
            },)}
                type="text" id="title" name="title" />

            {errors.title && <p role="alert">{errors.title.message || "Вы уже создавали список с таким именем"}</p>}

            <label htmlFor="username">Описание:</label>
            <textarea {...register("description", {
                pattern: {
                    value: /^[a-zA-Zа-яА-Я 0-9]+$/,
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
            <div className="private-list-checkbox">
                <p>Приватный список</p>
                <input type="checkbox" {...register("isPrivate")} />
            </div>

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

                    <div className="list-cover-container-preview">
                        <img src={preview as string} alt="Upload preview" />
                    </div>

                )}
            </div>
            <div className="buttons-container">
                {auth_store.user.list_count < 10 ?
                    <SubmitButton type={'submit'} onClick={undefined} >
                        Создать список
                    </SubmitButton> :
                    <ActionButton onClick={'/'}>
                        Вы уже создали максимальное кол-во списков
                    </ActionButton>
                }


                <SubmitButton type={'reset'} onClick={clearPhoto}>
                    Очистить
                </SubmitButton>
            </div>
        </form>
    )
}

export default observer(ListCreateForm);