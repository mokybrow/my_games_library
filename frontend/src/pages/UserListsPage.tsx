import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect } from 'react'
import { Context } from '..';
import { Link, useParams } from 'react-router-dom';
import ListService from '../service/ListService';

const UserListsPage: FC = () => {
    const { auth_store } = useContext(Context);
    const { user_store } = useContext(Context);
    const { list_store } = useContext(Context);

    const { username } = useParams<string>();

    useEffect(() => {
        user_store.findUser(String(username))
        if (localStorage.getItem('token')) {
            auth_store.checkAuth()
        }
    }, [])

    if (list_store.isLoading === true) {
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

    if (auth_store.user.username !== user_store.user.username) {

        return (
            <section className='other-page-section'>
                <div className="card-with-games-lists">
                    {user_store.list.length > 0 ? <>    {user_store.list.map(list =>
                        <Link key={list.id} to={'/list/' + list.slug} >

                            <div className="game-card-cover-container">
                                {list.cover != null ? <img src={`data:image/jpeg;base64,${list.cover}`} /> : <img src={require('../icons/img-not-found.png')} alt='' width="150" height="150" />}
                                <div className="title-card-body">
                                    <div className="title-card">
                                        <span className="card-title">{list.title}</span>
                                    </div>
                                </div>
                            </div>

                        </Link>)
                    }</> :
                        <div className="error-card-container">
                            Пользователь не создал ни одного списка
                        </div>}
                    {user_store.addedList.length > 0 ? <>
                        {user_store.addedList.map(addedList =>
                            <Link key={addedList.id} to={'/list/' + addedList.slug} >
                                <div className="game-card-cover-container">
                                    {addedList.cover != null ? <img src={`data:image/jpeg;base64,${addedList.cover}`} alt='' width="50" height="50" /> : <img src={require('../icons/img-not-found.png')} alt='' width="150" height="150" />}
                                    <div className="title-card-body">
                                        <div className="title-card">
                                            <span className="card-title">{addedList.title}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>)}</> :
                        null}

                </div>
            </section>)
    }

    return (
        <section className='other-page-section'>

            <div className="card-with-games-lists">

                {auth_store.list.length > 0 ? <>{auth_store.list.map(list =>
                    <Link key={list.id} to={'/list/'+list.slug} >
                        <div className="game-card-cover-container">
                            {list.cover != null ? <img src={`data:image/jpeg;base64,${list.cover}`} /> : <img src={require('../icons/img-not-found.png')} alt='' width="150" height="150" />}
                            <div className="title-card-body">
                                <div className="title-card">
                                    <span className="card-title">{list.title}</span>
                                </div>
                            </div>
                        </div>
                    </Link>)}</> :
                    <div className="error-card-container">
                        Пользователь не создал ни одного списка
                    </div>}
                {auth_store.addedList.length > 0 ? <>
                    {auth_store.addedList.map(addedList =>
                        <Link key={addedList.id} to={'/list/' + addedList.slug} reloadDocument>
                            <div className="game-card-cover-container">
                                {addedList.cover != null ? <img src={`data:image/jpeg;base64,${addedList.cover}`}/> : <img src={require('../icons/img-not-found.png')} alt='' width="150" height="150" />}
                                <div className="title-card-body">

                                    <div className="title-card">
                                        <span className="card-title">{addedList.title}</span>
                                    </div>
                                </div>
                            </div>

                        </Link>)}
                </> : null}
            </div>


        </section >

    )
}

export default observer(UserListsPage);