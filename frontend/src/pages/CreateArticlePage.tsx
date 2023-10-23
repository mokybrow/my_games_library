import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect } from 'react'
import { Context } from '..';
import CreateArticleForm from '../components/CreateArticleForm';


const CreateArticlePage: FC = () => {
    const { auth_store } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            auth_store.checkAuth()
        }

    }, [auth_store])
    if (!auth_store.user.is_superuser) {
        return (
            <section className='create-article-section'>
                <div className="create-article-grid-container">
                    Пошёл нахуй
                </div>
            </section>
        )
    }
    return (
        <section className='create-article-section'>
            <div className="create-article-grid-container">
                <CreateArticleForm/>
            </div>
        </section>
    )
}

export default observer(CreateArticlePage);
