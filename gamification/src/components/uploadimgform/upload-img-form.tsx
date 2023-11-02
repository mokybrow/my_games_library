import React, { FC, useCallback, useState } from 'react'
import './upload-img-form.css'
import { useDropzone } from 'react-dropzone';
import UserService from '../../services/user-service';
import { ActionButton } from '../buttons/action-button';
import { SubmitButton } from '../buttons/submit-button';

export interface UploadImgForm {
    children: string
}

export const UploadImgForm: FC = () => {

    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

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

    const imgHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            await UserService.uploadImg(acceptedFiles[0]);
        } catch (e) {

        }
        if (typeof acceptedFiles[0] === 'undefined') return;
        window.location.reload();
    }
    const clearPhoto = () => {
        setPreview(null)
    }
    return (

        <form action="#" onSubmit={imgHandler} className='user-settings-form-container'>
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

                    <div className="user-profile-cover-container-settings">
                        <img src={preview as string} alt="Upload preview" />
                    </div>

                )}
            </div>
            <div className="buttons-container">
                <SubmitButton type={'submit'} onClick={undefined}>
                    Обновить фото
                </SubmitButton>
                <SubmitButton type={'reset'} onClick={clearPhoto}>
                    Очистить
                </SubmitButton>
            </div>
        </form>
    )
}