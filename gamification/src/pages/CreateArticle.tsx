import React, { useContext } from 'react'
import '../styles/create-article.css'
import ArticleCreateForm from '../components/createarticleform/create-article-form';
import { Context } from '..';
import { InfoBanner } from '../components/infobanner/info-banner';
import { Helmet } from 'react-helmet';


const CreateArticle = () => {
    const { auth_store } = useContext(Context);
    if (!auth_store.user.reporter) {
        return (
            <section className='create-article-page-section'>
                <InfoBanner>
                    Доступ запрещён
                </InfoBanner>
            </section>
        )
    }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Создание статьи</title>
                <link rel="canonical" href={'https://dudesplay.ru/games'} />
                <meta name="title" content='Чуваки' />
            </Helmet>
            <section className='create-article-page-section'>
                <div className='create-article-grid'>
                    <ArticleCreateForm />
                </div>
            </section>
        </>
    )
}

export default CreateArticle