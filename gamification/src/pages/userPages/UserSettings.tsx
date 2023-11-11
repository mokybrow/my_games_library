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

        if (auth_store.user.username !== undefined) {
            if (auth_store.user.username.toLowerCase() !== String(username).toLowerCase()) {
                navigate('/' +  auth_store.user.username )

            }
            // else {
            //     user_store.getMyProfileFunc(auth_store.user.id, 0, 6)
            // }
        }

    }, [auth_store.user.username])

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