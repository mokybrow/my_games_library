import { observer } from 'mobx-react-lite';
import React from 'react'
import { RegistrationForm } from '../../components/authforms/RegistrationForm';
import '../../styles/auth-page.css'

const RegistrationPage = () => {
    return (
        <section className='auth-page'>
            <RegistrationForm />
        </section>
    )
}

export default observer(RegistrationPage);