import React, { FC, useCallback, useContext, useState } from 'react'
import { Context } from '..';
import { FormattedMessage } from 'react-intl';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { useDropzone } from 'react-dropzone';
import AuthService from '../service/AuthService';
import ChangePassForm from '../components/ChangePassForm';
import ChangePersonalDataForm from '../components/ChangePersonalDataForm';
import ListService from '../service/ListService';


type FormData = {
    name: string
    desctiption: string
}

const ListCreate: FC = () => {

    const [name, setName] = useState<string>('');
    const [desctiption, setDesctiption] = useState<string>('');
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const { auth_store } = useContext(Context);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const [errorCheck, setErrorCheck] = useState<boolean>(false);
    const [listID, setListID] = useState<string>('');

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

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({ mode: 'onChange' })
    
    const error: SubmitErrorHandler<FormData> = (data) => console.log(data)

    const submithandler = handleSubmit(async () => {
        console.log('genius', name, desctiption, isPrivate)
        const response = await ListService.createList(name, desctiption, isPrivate);
        console.log(response.data.list_created)

        setListID(String(response.data.list_created))
    })

    const imgHandler = async (e: React.SyntheticEvent) => {

        e.preventDefault();
        if (name !== '') {
            try {
                const response = await ListService.createList(name, desctiption, isPrivate);
                await ListService.addListCover(String(response.data.list_created), acceptedFiles[0]);

            } catch (e) {

            }
            if (typeof acceptedFiles[0] === 'undefined') return;
        }
    }

    const uniqListName = async () => {
        try {
            const response = await ListService.checkUniqListname(name);
            console.log('ошибка проверка', response.data.list_created)

            if (!response.data.list_created) {
                return true
            }
            return false

        } catch (error) {
        }
    };

    return (
        <>
            <section className='list-create-page'>
                <div className='list-create-grid-container'>
                    <div className="create-list-form-container">
                        <h1>Создайте свой список</h1>

                        <form action="#" onSubmit={submithandler} className='list-create-form'>
                            <div className="list-create-input-container">
                                <label htmlFor="name">Название</label>
                                <input
                                    type="text"
                                    {...register("name", {
                                        validate: uniqListName,
                                        required: {
                                            value: true,
                                            message: 'Поле не может быть пустым'
                                        },
                                        minLength: {
                                            value: 3,
                                            message: 'Название списка не может быть короче 3 символов'
                                        }
                                    },)}
                                    name='name'
                                    onChange={e => setName(e.target.value)}
                                    placeholder='Название списка'
                                    className='user-settings-text-field-input' />
                                {errors.name && <p className='error-alert-settings' role="alert">{errors?.name?.message || "Список с таким именем уже существует"}</p>}
                            </div>
                            <div className="list-create-input-container">
                                <label htmlFor="description">Описание</label>
                                <input
                                    name='description'
                                    type="text"
                                    onChange={e => setDesctiption(e.target.value)}
                                    placeholder='Описание'
                                    className='user-settings-text-field-input' />
                                {errors.desctiption && <p className='error-alert-settings' role="alert">{errors?.desctiption?.message || "Пароли не совпадают"}</p>}
                            </div>
                            <div className="list-private-container">
                                <p>Приватный список</p>
                                <input className='show-password' type="checkbox" onClick={() => setIsPrivate(!isPrivate)} />
                            </div>
                            
                        </form>
                        <form action="#" onSubmit={imgHandler} className='list-create-form'>
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
                    </div>
                </div>
            </section>
        </>
    )
}

export default observer(ListCreate);