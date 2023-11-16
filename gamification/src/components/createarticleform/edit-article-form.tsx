import React, { FC, SyntheticEvent, useCallback, useContext, useEffect, useState } from 'react'
import './create-article-form.css'
import { useDropzone } from 'react-dropzone';
import { SubmitButton } from '../buttons/submit-button';
import { useForm, SubmitHandler } from "react-hook-form"
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import ArticleService from '../../services/article-service';
import { InfoBanner } from '../infobanner/info-banner';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import { useParams, useSearchParams } from 'react-router-dom';

enum TagEnum {
    what = "Что пишем?",
    news = "news",
    review = "review",
}

interface IFormInput {
    title: string
    snippet: string
    text: string
    tag: TagEnum
}
interface EditorProps {
    text: string
    title: string
    snippet: any
    tag: any
    article_id: string
}


const ArticleEditForm: FC<EditorProps> = ({ text, title, snippet, tag, article_id }) => {
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const [artcileTitle, setArticleTitle] = useState('')
    const { artilce_store } = useContext(Context);
    const { auth_store } = useContext(Context);
    const [searchParams, setSearchParams] = useSearchParams();
    const titleParam = searchParams.get('title');

    useEffect(() => {
        artilce_store.getOneArticleFunc(String(titleParam))
    }, [artilce_store.article.id, artilce_store.article.text])

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IFormInput>()

    ///////////
    // const myColors = [
    //     "purple",
    //     "#785412",
    //     "#452632",
    //     "#856325",
    //     "#963254",
    //     "#254563",
    //     "white"
    // ];
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ align: ["right", "center", "justify"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video"],

            // [{ color: myColors }],
            // [{ background: myColors }]
        ]
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "color",
        "image",
        "background",
        "align", 'video'
    ];

    const [code, setCode] = useState(text);
    const handleProcedureContentChange = (content: any) => {
        setCode(content);
    };

    ///////////
    const onSubmit: SubmitHandler<IFormInput> = (data) => {

        artilce_store.editArticleFunc(data.title, code, data.snippet, data.tag, article_id)

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

        <form action="#" onSubmit={handleSubmit(onSubmit)} className='article-create-form-container'>

            <label htmlFor="title">Название статьи:</label>
            <input {...register("title", {
                validate: uniqArticleName,
                required: {
                    value: true,
                    message: 'Поле не может быть пустым'
                },
                minLength: {
                    value: 10,
                    message: 'Название статьи должно быть длиннее 10 символов'
                }
            },)}
                defaultValue={title}
                placeholder='Название статьи'
                type="text" id="title" name="title" onChange={(e) => setArticleTitle(e.target.value)} />

            <label htmlFor="snippet">Сниппет:</label>
            <input {...register("snippet", {
                required: {
                    value: true,
                    message: 'Поле не может быть пустым'
                },
                minLength: {
                    value: 50,
                    message: 'Сниппет должен быть длиннее 50 символов'
                }
            },)}
                defaultValue={snippet}

                placeholder='Сниппет статьи'
                type="text" id="snippet" name="snippet" />
            {errors.title && <p role="alert">{errors.title.message}</p>}

            {/* <label htmlFor="username">Обложка статьи:</label> */}

            {/* <div className="upload-field-container-form article">
                <div {...getRootProps()} className='upload-filed-container article'>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Да-да, бросай его сюда...</p> :
                            <p>Нажмите на поле или перетащите в него фото, которое хотите установить</p>
                    }
                </div>
                {preview && (

                    <div className="article-cover-container-preview">
                        <img src={preview as string} alt="Upload preview" />
                    </div>

                )}
            </div> */}
            <label htmlFor="text">Текст статьи:</label>
            <div>

                <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={code}
                    onChange={handleProcedureContentChange}
                />
            </div>
            {/* <textarea {...register("text", {
                required: {
                    value: true,
                    message: 'Поле не может быть пустым'
                },
                minLength: {
                    value: 200,
                    message: 'Придумайте статью подлиннее '
                }
            },)}

                placeholder='Начни и всё получится!'
                id="text" name="text" />
            {errors.text && <p role="alert">{errors.text.message}</p>} */}


            <select className='sort-filter-selector' {...register("tag", {
                required: true
            })} defaultValue={tag}
            >
                <option value=''>Что пишем?</option>
                <option value="news">Новость</option>
                <option value="review">Обзор</option>
            </select>
            <div className="buttons-container">

                <SubmitButton type={'submit'} onClick={undefined} >
                    В печать
                </SubmitButton>

            </div>
        </form>
    )
}

export default observer(ArticleEditForm);