import React, { useContext, useEffect } from 'react'
import AuthService from '../../services/auth-service'
import { useSearchParams } from 'react-router-dom';
import { Context } from '../..';
import '../../styles/service-page.css'
import { observer } from 'mobx-react-lite';
const VerifyEmailPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get('token');
    const { auth_store } = useContext(Context);

    useEffect(() => {
        try {
            const response = auth_store.emailVerify(String(token))
        } catch (error) {

        }

    }, [])


    if (auth_store.user.is_verified) {
        return (
            <section className='sevice-page-section'>
                <img src={require('../../assets/img/tom_approve.webp')} alt="tom approve" />
                <h1>Почта уже подтверждена</h1>
            </section>
        )
    }


    return (
        <section className='sevice-page-section'>
            <img src={require('../../assets/img/tom_approve.webp')} alt="tom approve" />
            <h1>Почта успешно подтверждена</h1>
        </section>
    )
}

export default observer(VerifyEmailPage);