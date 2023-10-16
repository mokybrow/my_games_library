import React, { FC, useCallback, useContext, useState } from 'react'
import { Context } from '..';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { useDropzone } from 'react-dropzone';
import AuthService from '../service/AuthService';

type FormData = {
    currentPassword: string
    password: string
    confPassword: string
}

const UserSettings: FC = () => {
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confPassword, setConfPassword] = useState<string>('');
    const { auth_store } = useContext(Context);
    const [passwordShown, setPasswordShown] = useState(false);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

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
    } = useForm<FormData>({ mode: 'onSubmit' })

    const submithandler = handleSubmit(() => {
        console.log(auth_store.loginError)
    })

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const confPasswordCheck = () => {
        if (password !== confPassword) {
            return false;
        }
        return true
    };
    const imgHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            await AuthService.uploadImg(acceptedFiles[0]);

        } catch (e) {

        }
        if (typeof acceptedFiles[0] === 'undefined') return;
        window.location.reload();
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
                            <form action="#" onSubmit={submithandler} className='settings-form'>
                                <div className="password-container">
                                    <input autoComplete="on" type={passwordShown ? "text" : "currentPassword"} {...register("currentPassword", {
                                        required: {
                                            value: true,
                                            message: "Поле не может быть пустым"
                                        },
                                        minLength: {
                                            value: 8,
                                            message: 'Придумайте надёжный пароль'
                                        }
                                    })} onChange={e => setCurrentPassword(e.target.value)} placeholder='Current Password' className='user-settings-text-field-input' />
                                    {errors.password && <p className='error-alert' role="alert">{errors?.password?.message}</p>}
                                </div>

                                <div className="password-container">
                                    <input type={passwordShown ? "text" : "password"} {...register("password", {
                                        required: {
                                            value: true,
                                            message: "Поле не может быть пустым"
                                        },
                                        minLength: {
                                            value: 8,
                                            message: 'Придумайте надёжный пароль'
                                        }
                                    })} onChange={e => setPassword(e.target.value)} placeholder='Password' className='user-settings-text-field-input' />
                                    {errors.password && <p className='error-alert' role="alert">{errors?.password?.message || "Пароли не совпадают"}</p>}
                                </div>
                                <div className="password-container">
                                    <input type={passwordShown ? "text" : "password"} {...register("confPassword", {
                                        validate: confPasswordCheck,
                                        required: {
                                            value: true,
                                            message: "Поле не может быть пустым"
                                        },
                                    })} onChange={e => setConfPassword(e.target.value)} placeholder='Confirm Password' className='user-settings-text-field-input' />
                                    {errors.confPassword && <p className='error-alert' role="alert">{errors?.confPassword?.message || "Пароли не совпадают"}</p>}

                                </div>
                                <div className="show-password-container">
                                    <p>Показать пароль</p>
                                    <input className='show-password' type="checkbox" onClick={togglePasswordVisiblity} />
                                </div>
                                <div className="password-container">
                                    <button className='settings-form-button' type='submit'>Изменить данные</button>
                                </div>

                            </form>

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

                    <div className="profile-banner-private-data-settings">
                        <div className="user-profile-cover-container">
                            {auth_store.user.img == null || auth_store.user.img == '' ? <img src={require('../icons/user.png')} /> : <img src={auth_store.user.img} />}
                        </div>
                        <div className="user-name-container">
                            <h1 className="profile-banner-name">{auth_store.user.name} {auth_store?.user?.surname}</h1>
                        </div>
                    </div>

                </div>

            </section>
        </>
    )
}

export default observer(UserSettings);