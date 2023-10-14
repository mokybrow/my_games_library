import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react'
import { Context } from '..';
import AdminService from '../service/AdminService';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { Pagination } from '../components/Pagination';

const AdminUsers: FC = () => {

    const { auth_store } = useContext(Context);

    const [searchParams, setSearchParams] = useSearchParams();
    const myParam = searchParams.get('page');
    const [currentPage, setCurrentPage] = useState<number>(Number(myParam))

    useEffect(() => {
        AdminService.getUsers(3)

    }, [])

    const handleClickPage = async ({ selected }: any) => {
        setCurrentPage(selected + 1)
        setSearchParams({ page: selected + 1 });

    }


    if (auth_store.user.is_superuser) {
        return (
            <section className='admin-section'>
                <div className='main-grid-container'>
                    <span>Ахахахах</span>
                    <span>Ахахахах</span>
                    <span>Ахахахах</span>
                    <Link to={{
                        pathname: '/dash/admin/users',
                        search: '?page=1',
                    }}>Пользователи</Link>
                    <Pagination initialPage={currentPage} pageCount={20} onChange={handleClickPage} />
                </div>
            </section>
        )

    }
    return (
        <div>AdminPage</div>
    )
}

export default observer(AdminUsers);
