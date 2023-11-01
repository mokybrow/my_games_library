import { observer } from 'mobx-react-lite';
import React, { FC } from 'react'
import '../../styles/auth-page.css'
import { LoginForm } from '../../components/authforms/LoginForm';

const LoginPage: FC = () => {
    return (
        <section className='auth-page'>
            <LoginForm/>
        </section>
    )
}

export default observer(LoginPage);