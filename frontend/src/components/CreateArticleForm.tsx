import { FC, useCallback, useContext, useEffect, useState } from 'react'
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form"

import ListService from '../service/ListService';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import ArticleService from '../service/ArticleService';

// type FormData = {
//     name: string
//     desctiption: string
// }

type FormData = {
    title: string
    tags: string
    text: string
}

const CreateArticleForm: FC = () => {
    const [tags, setTags] = useState<string>('');
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const [title, setTitle] = useState<string>('');
    const { artilce_store } = useContext(Context);

    const [text, setText] = useState<string>();

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


    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(acceptedFiles[0])
        artilce_store.createArticleFunc(title, String(text), tags, acceptedFiles[0])

        navigate(`/`)
        if (typeof acceptedFiles[0] === 'undefined') return;
    }

    const error: SubmitErrorHandler<FormData> = (data) => {

    }


    return (

        <form action="#" onSubmit={handleSubmit(onSubmit, error)} className='data-form-style' >
            <input
                {...register("title", {
                    required: {
                        value: true,
                        message: "Поле не может быть пустым"
                    },
                    minLength: {
                        value: 2,
                        message: 'Название списка не может быть короче 2 символов'
                    }
                })} onChange={e => setTitle(e.target.value)} placeholder='Название' className='text-field-input' />
            {errors.title && <p className='error-alert' role="alert">{errors?.title?.message || "Вы уже создавали список с таким именем"}</p>}

            <div className="upload-field-container-form">
                <div {...getRootProps()} className='upload-filed-container' >
                    <input {...getInputProps()}
                         />

                    {
                        isDragActive ?
                            <p>Да-да, бросай его сюда...</p> :
                            <p>Нажмите на поле или перетащите в него фото, которое хотите установить обложкой статьи</p>
                    }
                </div>


                {preview && (

                    <div className="article-create-cover-container">
                        <img src={preview as string} alt="Upload preview" />
                    </div>

                )}
            </div>
            {acceptedFiles[0] == undefined ? <p className='error-alert' role="alert">Загрузите обложку статьи</p>:null}

            <textarea className='article-text-area'
                placeholder='Текст статьи'
                {...register("text", {
                    required: {
                        value: true,
                        message: "Поле не может быть пустым"
                    },
                    minLength: {
                        value: 200,
                        message: 'Описание должно быть длиннее 200 симоволов'
                    }
                })}
                onChange={e => setText(e.target.value)}>

            </textarea >
            {errors.text && <p className='error-alert' role="alert">{errors?.text?.message}</p>}

            <input
                {...register("tags", {
                    required: {
                        value: true,
                        message: "Поле не может быть пустым"
                    },
                })} onChange={e => setTags(e.target.value)} placeholder='Теги' className='text-field-input' />
            {errors.tags && <p className='error-alert' role="alert">{errors?.tags?.message}</p>}


            <button className='data-form-button' type='submit'>В Печать!</button>


        </form>

    )

}


export default observer(CreateArticleForm);