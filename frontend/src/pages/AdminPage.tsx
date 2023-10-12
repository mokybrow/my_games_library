import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect } from 'react'
import { Context } from '..';
import AdminService from '../service/AdminService';

const AdminPage:FC = () => {
    const { auth_store } = useContext(Context);

    useEffect(() => {
        AdminService.getUsers(3)
    }, [])

    if (auth_store.user.is_superuser) {
        return (
            <section className='admin-section'>
                <div className='main-grid-container'>
                <span>Ахахахах</span>
                <span>Ахахахах</span>
                <span>Ахахахах</span>
                <span>Ахахахах</span>
                <span>Ахахахах</span>
                <span>Ахахахах</span>
                </div>
            </section>
        )

    }
    return (
        <div>AdminPage</div>
    )
}

export default observer(AdminPage);
