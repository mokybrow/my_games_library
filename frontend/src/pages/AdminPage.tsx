import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect } from 'react'
import { Context } from '..';
import AdminService from '../service/AdminService';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';

const AdminPage: FC = () => {

    const { auth_store } = useContext(Context);


    const [searchParams, setSearchParams] = useSearchParams();

    // Get a specific query parameter
    const myParam = searchParams.get('page');

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
                    <Link to={{
                        pathname: 'users',
                        search: '?page=1',
                    }}>Пользователи</Link>
                </div>
            </section>
        )

    }
    return (
        <div>AdminPage</div>
    )
}

export default observer(AdminPage);