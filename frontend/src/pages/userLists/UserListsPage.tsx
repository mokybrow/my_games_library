import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect } from 'react'
import { Context } from '../..';
import { Link, useParams } from 'react-router-dom';
import ListService from '../../service/ListService';
import { ImageCard } from '../../components/ImageCard';

const UserListsPage: FC = () => {
    const { auth_store } = useContext(Context);
    const { user_store } = useContext(Context);
    const { list_store } = useContext(Context);

    const { username } = useParams<string>();

    useEffect(() => {
        const checkUsername = async () => {
            const response = await auth_store.checkAuth()

            return response
        }
        checkUsername().then(function (value: any) {
            if (value !== String(username)) {
                user_store.findUser(String(username), 0, 36)

            }
            else {
                auth_store.getUserListsFunc()
            }
        })

    }, [])

    if (auth_store.isLoading === true || user_store.isLoading === true) {
        return (
            <section className='loader-section'>
                <div className="lds-spinner"><div></div>
                    <div></div><div></div>
                    <div></div><div></div><div>
                    </div><div></div><div></div><div
                    ></div><div></div><div></div>
                    <div></div></div>
            </section>

        )
    }

    if ((auth_store.isAuth && auth_store.user.username !== username) || (!auth_store.isAuth)) {

        return (
            <section className='page-section'>
                <div className="grid-container">
                    {user_store.list.length > 0 ? <>    {user_store.list.map(list =>
                        <Link key={list.id} to={'/list/' + list.slug} >
                            <ImageCard src={list.cover != null ? `data:image/jpeg;base64,${list.cover}` : require("../../icons/img-not-found.png")} title={String(list.title)} />


                        </Link>)
                    }</> :
                        <div className="error-card-container">
                            Пользователь не создал ни одного списка
                        </div>}
                    {user_store.addedList.length > 0 ? <>
                        {user_store.addedList.map(addedList =>
                            <Link key={addedList.id} to={'/list/' + addedList.slug} >
                                <ImageCard src={addedList.cover != null ? `data:image/jpeg;base64,${addedList.cover}` : require("../../icons/img-not-found.png")} title={String(addedList.title)} />

                            </Link>)}</> :
                        null}

                </div>
            </section>)
    }

    return (
        <section className='page-section'>
        <div className="grid-container">

                {auth_store.list.length > 0 ? <>{auth_store.list.map(list =>
                    <Link key={list.id} to={'/list/' + list.slug} >

                        <ImageCard src={list.cover != null ? `data:image/jpeg;base64,${list.cover}` : require("../../icons/img-not-found.png")} title={String(list.title)} />
                    </Link>)}</> :
                    <div className="error-card-container">
                        Пользователь не создал ни одного списка
                    </div>}
                {auth_store.addedList.length > 0 ? <>
                    {auth_store.addedList.map(addedList =>
                        <Link key={addedList.id} to={'/list/' + addedList.slug} reloadDocument>

                            <ImageCard src={addedList.cover != null ? `data:image/jpeg;base64,${addedList.cover}` : require("../../icons/img-not-found.png")} title={String(addedList.title)} />

                        </Link>)}
                </> : null}
            </div>


        </section >

    )
}

export default observer(UserListsPage);