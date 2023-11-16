import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '..';
import { getLocalToken } from '../utils/utils';
import { observer } from 'mobx-react-lite';
import '../styles/article-page.css'
import { FormattedMessage, FormattedDate } from 'react-intl';
import { NotFoundPage } from '../components/not_found_page/not-found-page';
import ModalWindow from '../components/modalwindow/modal-window';
import Loader from '../components/loader/loader';
import { Helmet } from "react-helmet";
import { ActionButton } from '../components/buttons/action-button';

const ArticlePage = () => {
    const { slug } = useParams<string>();
    const { artilce_store } = useContext(Context);
    const { auth_store } = useContext(Context);
    const [hasAuthorLike, setHasAuthorLike] = useState(false)
    const [active, setModalActive] = useState(false);

    let navigate = useNavigate();
    var parse = require('html-react-parser');

    useEffect(() => {
        window.scrollTo(0, 0);
        artilce_store.getOneArticleFunc(String(slug))

        if (artilce_store.article.hasAuthorLike === 1) {
            setHasAuthorLike(true)
        }
        if (artilce_store.article.hasAuthorLike === 0) {
            setHasAuthorLike(false)
        }
    }, [artilce_store.article.id,artilce_store.article.text, slug])

    if (artilce_store.isLoading) {
        return (
            <Loader />
        )
    }

    if (artilce_store.article.id === undefined) {
        return (
            <NotFoundPage />
        )
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{artilce_store.article.title}</title>
                <link rel="canonical" href={'https://dudesplay.ru/article/'+artilce_store.article.slug} />
                <meta name="title" content={artilce_store.article.title} />
                { parse(artilce_store.article.text)[0] != undefined ? 
                <meta name="description" content={parse(artilce_store.article.text)[0].props.children} />
                : null}
                <meta property="og:site_name" content='Чуваки' />
                <meta property="og:type" content='article' />
                <meta property="og:title" content={artilce_store.article.title} />
                { parse(artilce_store.article.text)[0] != undefined ? 
                <meta property="og:description" content={parse(artilce_store.article.text)[0].props.children} />
                : null}
                <meta property="article:published_date" content={artilce_store.article.created_at.toString()} />

            </Helmet>

            <section className='article-page-section'>
                <div className="article-image-container-shadow">
                </div>
                        {auth_store.user.reporter ? <div className='edit-button'><ActionButton onClick={`/article/edit?title=${slug}`}>Отредактировать</ActionButton></div>: null}
                <div className="article-image-container">
                    {artilce_store.article.cover !== undefined ?
                        <img src={"data:image/jpeg;base64," + artilce_store.article.cover} alt="" />
                        : null
                    }
                </div>
                <div className="article-page-grid">
                    <h1 className="article-title"> {artilce_store.article.title}</h1>

                    <div className="about-author">
                        <span>Автор</span>
                        <Link to={'/' + artilce_store.article.username}>
                            <span>{artilce_store.article.username}</span>
                        </Link>
                        <div className="date-container">

                            {artilce_store.article.created_at !== undefined ?
                                <FormattedDate
                                    value={artilce_store.article.created_at}
                                    year='numeric'
                                    month='short'
                                    day='numeric'
                                    weekday='short'
                                />
                                : null
                            }
                        </div>
                    </div>
                    <div className="article-text-container">

                        {parse(artilce_store.article.text)}

                    </div>
                    <div className="like-count-container">
                        <span>Оценить</span>

                        {auth_store.isAuth ? <>
                            <input onClick={() => { artilce_store.likeArticle(artilce_store.article.id, String(slug)) }} className="custom-checkbox-comment like" type='checkbox' id={artilce_store.article.id} name={artilce_store.article.id} value="red" defaultChecked={hasAuthorLike === true ? true : false} />
                            <label htmlFor={artilce_store.article.id}></label></> :
                            <>
                                <input className="custom-checkbox-comment like" type="checkbox" id='unauthorize' name='unauthorize' value="red" onClick={() => navigate('/login')} />
                                <label htmlFor='unauthorize'></label>
                            </>}

                        <span>{artilce_store.article.like_count}</span>

                    </div>
                </div>

            </section >
        </>
    )


}

export default observer(ArticlePage);