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
    review_id: string,
    offset: number,
    limit: number,
    popular: boolean | null,
    date: boolean | null,
    authorLike: number | null,
}


export const ReviewCard: FC<ArticleCardProps> = ({ src, title, username, comment, img, slug, columnSpan, created_at, like_count, review_id, authorLike, offset, limit, popular, date }) => {
    var parse = require('html-react-parser');
    const [active, setModalActive] = useState(false);
    const { auth_store } = useContext(Context);
    const { review_store } = useContext(Context);
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
                {src == '' ? null :
                    <div className="article-img-container">
                        <img src={src} alt='' width="150" height="150" />
                    </div>}
                <div className="article-text-container">
                    <div className="article-text-container-header" >
                        {img === null || img === '' ? <img className="user-mini-img" src={require('../icons/user.png')} /> :

                            <img className="user-mini-img" src={img} width={100} height={100} />}
                        <Link to={'/' + username}><h3>{username}</h3></Link>
                        <div className="grade-container">
                            <span className='grade-border'>{like_count}</span>
                        </div>


                    </div>
                    <div className="article-text-container-body">
                        <Link to={'/game/' + slug}><h4>{title}</h4></Link>

                        <div className='article-text-container-body-not-modal' onClick={() => setModalActive(true)} >{parse(comment)}</div>
                    </div>

                </div>
            </div>
            <ModalWindow active={active} setActive={setModalActive}>

                <div className="article-text-container-body">

                    <div className="article-text-container-header" >

                        {img === null || img === '' ? <img className="user-mini-img" src={require('../icons/user.png')} /> :
                            <img className="user-mini-img" src={img} width={100} height={100} />}

                        <Link to={'/' + username}><h3>{username}</h3></Link>
                        <span className='game-profile-release'>
                            <FormattedDate
                                value={created_at}
                                year='numeric'
                                month='long'
                                day='numeric'
                            />
                        </span>

                    </div>
                    {src == '' ? null :
                        <div className="article-img-container-modal">
                            <img src={src} alt='' width="150" height="150" />
                        </div>}
                    <div className="article-text-container-body">
                        <Link to={'/game/' + slug}><h1>{title}</h1></Link>
                        <div className='article-text-container-body-modal'>{parse(comment)}</div>

                    </div>
                    <div className="like-count-container">
                        <span>{like_count}</span>
                        {auth_store.isAuth ? <>
                            <input  onClick={() => { review_store.likeReview(offset, limit, popular, review_id, null) }} className="custom-checkbox-comment like" type='checkbox' id={review_id} name={review_id} value="red" defaultChecked={authorLike === 1 ? true : false} />
                            <label htmlFor={review_id}></label></> :
                            <>
                                <input className="custom-checkbox-comment like" type="checkbox" id='unauthorize' name='unauthorize' value="red" onClick={() => navigate('/login')} />
                                <label htmlFor='unauthorize'></label>
                            </>}

                    </div>
                </div>
            </ModalWindow>
        </>
    )
}
