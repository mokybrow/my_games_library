import React, { useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '..';
import { getLocalToken } from '../utils/utils';
import { observer } from 'mobx-react-lite';
import '../styles/article-page.css'
import { FormattedMessage, FormattedDate } from 'react-intl';
import { NotFoundPage } from '../components/not_found_page/not-found-page';

const ArticlePage = () => {
    const { slug } = useParams<string>();
    const { artilce_store } = useContext(Context);
    const { auth_store } = useContext(Context);

    let navigate = useNavigate();
    var parse = require('html-react-parser');

    useEffect(() => {
        artilce_store.getOneArticleFunc(String(slug))
    }, [artilce_store, slug])

    if (artilce_store.isLoading) {
        return (
            <div className='loading-page'>
                <img src={require('../assets/img/dude.jpeg')} alt="Dude" />
            </div>
        )
    }
    if (artilce_store.article.id === undefined) {
        return (
            <NotFoundPage/>
        )
    }
    return (
        <>
            <section className='article-page-section'>
                <div className="article-image-container-shadow">
                </div>

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
                            <input onClick={() => { artilce_store.likeArticle(artilce_store.article.id, String(slug)) }} className="custom-checkbox-comment like" type='checkbox' id={artilce_store.article.id} name={artilce_store.article.id} defaultChecked={artilce_store.article.hasAuthorLike === 1 ? true : false} />
                            <label htmlFor={artilce_store.article.id}></label></> :
                            <>
                                <input className="custom-checkbox-comment like" type="checkbox" id='unauthorize' name='unauthorize' value="red" onClick={() => navigate('/login')} />
                                <label htmlFor='unauthorize'></label>
                            </>
                        }
                        <span>{artilce_store.article.like_count}</span>

                    </div>
                </div>

            </section>
        </>
    )
}

export default observer(ArticlePage);