import React, { useContext, useEffect, useState } from 'react'
import '../styles/create-article.css'
import ArticleEditForm from '../components/createarticleform/edit-article-form';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';
import { Context } from '..';
import { InfoBanner } from '../components/infobanner/info-banner';
import { Helmet } from 'react-helmet';


const EditArticle = () => {
    const [artcileTitle, setArticleTitle] = useState('')
    const { artilce_store } = useContext(Context);
    const { auth_store } = useContext(Context);
    const { user_store } = useContext(Context);
    const [searchParams, setSearchParams] = useSearchParams();
    const titleParam = searchParams.get('title');

    useEffect(() => {
        artilce_store.getOneArticleFunc(String(titleParam))
    }, [artilce_store.article.id, artilce_store.article.text])

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
                {artilce_store.article.title !== undefined ? 
                <title>Редактирование статьи {artilce_store.article.title}</title>
            : null}
                <link rel="canonical" href={'https://dudesplay.ru/games'} />
                <meta name="title" content='Чуваки' />
            </Helmet>
            <section className='create-article-page-section'>
                <div className='create-article-grid'>
                    {artilce_store.article.text !== undefined ?
                        <ArticleEditForm text={artilce_store.article.text}
                            title={artilce_store.article.title}
                            snippet={artilce_store.article.snippet}
                            tag={artilce_store.article.tags} article_id={artilce_store.article.id} />
                        : null}
                </div>
            </section>
        </>
    )
}

export default observer(EditArticle);