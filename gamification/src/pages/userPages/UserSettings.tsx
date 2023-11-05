import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react'
import '../../styles/user-settings.css'
import { Context } from '../..';

import { UploadImgForm } from '../../components/uploadimgform/upload-img-form';
import { UserSettingsForm } from '../../components/usersettingsform/user-settings-form';
import PersonalDataForm from '../../components/usersettingsform/personal-data-form';
import { useNavigate, useParams } from 'react-router-dom';

const UserSettings = () => {
    const { user_store } = useContext(Context);
    const { auth_store } = useContext(Context);
    const { username } = useParams<string>();
    let navigate = useNavigate();

    useEffect(() => {
        const checkUsername = async () => {
            const response = await auth_store.checkAuth()
            return response
        }
        checkUsername().then(function (value: any) {
            if (value.toLowerCase() !== String(username).toLowerCase()) {
                navigate('/'+value)

            } else {
                user_store.getMyProfileFunc(auth_store.user.id, 0, 6)
            }
        })

    }, [])

    if (user_store.isLoading || auth_store.isLoading) {
        return (
            <div className='loading-page'>
                <img src={require('../../assets/img/dude.jpeg')} alt="Dude" />
            </div>
        )
    }
    return (
        <section className='user-profile-page'>
            <div className="user-settings-grid-container">
                <div className="user-settings-banner">
                    <h1>Личные Данные</h1>
                    <PersonalDataForm />
                </div>

                <div className="user-settings-banner upload">
                    <h1>Фото Профиля</h1>
                    <UploadImgForm />
                </div>
                <div className="user-settings-banner">
                    <h1>Безопасность</h1>
                    <UserSettingsForm />
                </div>
            </div>
        </section>
    )
}

export default observer(UserSettings);