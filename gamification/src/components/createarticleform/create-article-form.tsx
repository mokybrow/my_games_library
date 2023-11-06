import React, { FC, SyntheticEvent, useCallback, useContext, useState } from 'react'
import './create-article-form.css'
import { useDropzone } from 'react-dropzone';
import { SubmitButton } from '../buttons/submit-button';
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form"
import { Context } from '../..';
import ListService from '../../services/list-service';
import { ActionButton } from '../buttons/action-button';
import { observer } from 'mobx-react-lite';
import ArticleService from '../../services/article-service';

enum TagEnum {
    what = "Что пишем?",
    news = "news",
    review = "review",
}

interface IFormInput {
    title: string
    text: string
    tag: TagEnum
}

const ArticleCreateForm: FC = () => {
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const [artcileTitle, setArticleTitle] = useState('')
    const { artilce_store } = useContext(Context);
    const { auth_store } = useContext(Context);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        if (!acceptedFiles[0]) {
            artilce_store.createArticleFunc(data.title, data.text, data.tag, '')
        } else {
            artilce_store.createArticleFunc(data.title, data.text, data.tag, acceptedFiles[0])

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

    const uniqArticleName = async () => {
        try {
            const response = await ArticleService.approveCreateArticle(artcileTitle);
            if (response.data.detail === true) {
                return true
            }

        } catch (error) {
            return false
        }
    };
    return (

        <form action="#" onSubmit={handleSubmit(onSubmit)} className='list-create-form-container'>
            <label htmlFor="username">Название статьи:</label>
            <input {...register("title", {
                validate: uniqArticleName,
                required: {
                    value: true,
                    message: 'Поле не может быть пустым'
                },
                pattern: {
                    value: /^[a-zA-Zа-яА-Я 0-9 ! № # ? . ,]+$/,
                    message: "Вы ввели недопустимые символы"
                },
                minLength: {
                    value: 10,
                    message: 'Название статьи должно быть длиннее 10 символов'
                }
            },)}
                type="text" id="title" name="title" onChange={(e) => setArticleTitle(e.target.value)}/>

            {errors.title && <p role="alert">{errors.title.message || "Вы уже писали статью с таким названием"}</p>}

            <label htmlFor="text">Текст статьи:</label>
            <textarea {...register("text", {
                required: {
                    value: true,
                    message: 'Поле не может быть пустым'
                },
                minLength: {
                    value: 200,
                    message: 'Придумайте статью подлиннее '
                }
            },)}
                id="text" name="text" />
            {errors.text && <p role="alert">{errors.text.message}</p>}


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
            <select className='sort-filter-selector' {...register("tag", {
                required: true
            })}>
                <option value=''>Что пишем?</option>
                <option value="news">Новость</option>
                <option value="review">Обзор</option>
            </select>
            <div className="buttons-container">

                <SubmitButton type={'submit'} onClick={undefined} >
                    В печать
                </SubmitButton>


                <SubmitButton type={'reset'} onClick={clearPhoto}>
                    Очистить
                </SubmitButton>
            </div>
        </form>
    )
}

export default observer(ArticleCreateForm);