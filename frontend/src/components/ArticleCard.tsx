import React, { FC, useContext, useState } from 'react'
import './styles/article-card.css'
import { FormattedDate, FormattedMessage, FormattedNumber } from 'react-intl'
import { Link, useNavigate } from 'react-router-dom'
import { ModalWindow } from './ModalWindow'
import { Context } from '..'

export interface ArticleCardProps {
    src: string,
    title: string,
    username: string,
    comment: string,
    img: string,
    slug: string,
    columnSpan: number,
    created_at: Date,
    like_count: number,
    article_id: string,
    authorLike: number | null,
    offset: number,
    limit: number,
    popular: boolean | null,
    date: boolean | null,

}


export const ArticleCard: FC<ArticleCardProps> = ({ src, title, username, comment, img, 
    slug, columnSpan, created_at, like_count, 
    article_id, authorLike, offset, limit, popular, date }) => {

    var parse = require('html-react-parser');
    const [active, setModalActive] = useState(false);
    const { auth_store } = useContext(Context);
    const { artilce_store } = useContext(Context);
    const body = document.body;

    if (active) {
        body.classList.toggle('lock')
    }
    if (!active) {
        body.classList.remove('lock')

    }
    let navigate = useNavigate();
    return (
        <>
            <div className="article-card-container">
                <div className="article-img-container">
                    <img src={src} alt='' width="150" height="150" />
                </div>
                <div className="article-text-container">
                    <div className="article-text-container-header" >
                        {img === null || img === '' ? <img className="user-mini-img" src={require('../icons/user.png')} /> :

                            <img className="user-mini-img" src={img} width={100} height={100} />}
                        <Link to={'/' + username}><h5>{username}</h5></Link>
                        <div className="user-grade-container">
                            {like_count !== null ? <span className='grade-number-container'>
                                <FormattedNumber
                                    value={like_count} /></span> : <span className='grade-number-container'>
                                <FormattedMessage id="content.gameprofile.nodata" /></span>}
                        </div>

                    </div>
                    <div className="article-text-container-body">
                        <h4>{title}</h4>
                        <div className='article-text-container-body-not-modal' onClick={() => setModalActive(true)} >{parse(comment)}</div>
                    </div>

                </div>
            </div>
            <ModalWindow active={active} setActive={setModalActive}>

                <div className="article-text-container-body">

                    <div className="article-text-container-header" >
                        {img === null || img === '' ? <img className="user-mini-img" src={require('../icons/user.png')} /> :

                            <img className="user-mini-img" src={img} width={100} height={100} />}
                        <Link to={'/' + username}><h5>{username}</h5></Link>
                        <span className='game-profile-release'>
                            <FormattedDate
                                value={created_at}
                                year='numeric'
                                month='long'
                                day='numeric'
                            />
                        </span>

                    </div>
                    <div className="article-img-container-modal">
                        <img src={src} alt='' width="150" height="150" />
                    </div>
                    <div className="article-text-container-body">
                        <h1>{title}</h1>
                        <div className='article-text-container-body-modal'>{parse(comment)}</div>
                        <div className="like-count-container">
                            <span>{like_count}</span>
                            {auth_store.isAuth ? <>
                                <input onClick={() => { artilce_store.likeArticle(article_id, offset, limit, popular, date) }} className="custom-checkbox-comment like" type='checkbox' id={article_id} name={article_id} value="red" defaultChecked={authorLike === 1 ? true : false} />
                                <label htmlFor={article_id}></label></> :
                                <>
                                    <input className="custom-checkbox-comment like" type="checkbox" id='unauthorize' name='unauthorize' value="red" onClick={() => navigate('/login')} />
                                    <label htmlFor='unauthorize'></label>
                                </>}

                        </div>
                    </div>

                </div>
            </ModalWindow>
        </>
    )
}
