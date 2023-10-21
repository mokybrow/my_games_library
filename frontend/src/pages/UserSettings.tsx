import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { Context } from '..';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { useDropzone } from 'react-dropzone';
import AuthService from '../service/AuthService';
import ChangePassForm from '../components/ChangePassForm';
import ChangePersonalDataForm from '../components/ChangePersonalDataForm';
import { useNavigate, useParams } from 'react-router-dom';


const UserSettings: FC = () => {

    const { auth_store } = useContext(Context);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const { username } = useParams<string>();
    let navigate = useNavigate();

    useEffect(() => {
        const checkUsername = async () => {
            const response = await auth_store.checkAuth()

            return response
        }
        checkUsername().then(function (value: any) {

            auth_store.getMyProfileFunc()

        })

    }, [])

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


    const imgHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            await AuthService.uploadImg(acceptedFiles[0]);

        } catch (e) {

        }
        if (typeof acceptedFiles[0] === 'undefined') return;
        window.location.reload();
    }

    if (!auth_store.checkAuth) {
        return (
            <section className='list-create-page'>
                <div className='list-create-grid-container'>
                    Этот раздел доступен только авторизованным пользователям
                </div>
            </section>
        )
    }

    if (auth_store.isAuth && auth_store.user.username !== username) {
        navigate("/");
    }

    return (
        <>
            <section className='user-settings-page'>
                <div className='user-settings-grid-container'>

                    <div className="profile-banner-with-name">
                        <div className="user-name-container">
                            <h1 className="settings-banner-name">{auth_store.user.name} {auth_store?.user?.surname}</h1>
                        </div>
                    </div>

                    <div className="profile-banner-security-settings">
                        <div className="user-settings-form-container ">
                            <h1>Безопасность</h1>
                            <ChangePassForm />
                        </div>
                    </div>

                    {/* ИЗМЕНЕНИЕ КАРТИНКИ */}

                    <div className="profile-banner-cover-settings">
                        <div className="user-settings-form-container ">
                            <h1>Фото Профиля</h1>

                            <form action="#" onSubmit={imgHandler} className='settings-form'>
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

                                        <div className="user-profile-cover-container">
                                            <img src={preview as string} alt="Upload preview" />
                                        </div>

                                    )}
                                </div>
                                <div className="password-container">
                                    <button className='settings-form-button' type='submit'>Изменить Фото</button>
                                </div>
                            </form>
                        </div>

                    </div>
                    {/* ЛИЧНЫЕ ДАННЫЕ */}
                    <div className="profile-banner-private-data-settings">
                        <div className="user-settings-form-container ">
                            <h1>Личные данные</h1>
                            <ChangePersonalDataForm />
                        </div>
                    </div>

                </div>

            </section>
        </>
    )
}

export default observer(UserSettings);