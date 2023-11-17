import React, { FC, useContext, useState } from 'react'
import './review-card.css'
import { Link, useNavigate } from 'react-router-dom'
import ModalWindow from '../modalwindow/modal-window'
import { Context } from '../..'

export interface MainPageReviewCardProps {
    reviewId: string
    reviewSlug: string
    reviewCover: string
    reviewGrade: number
    reviewTitle: string
    reviewComment: string
    reviewUsername: string
    reviewLikeCount: number
    reviewHasAuthorLike: number
}

export const MainPageReviewCard: FC<MainPageReviewCardProps> = ({ reviewId, reviewSlug, reviewCover, reviewTitle, reviewGrade, reviewComment, reviewUsername, reviewLikeCount, reviewHasAuthorLike }) => {
    const [active, setModalActive] = useState(false);
    const { games_store } = useContext(Context);
    const { artilce_store } = useContext(Context);
    const { auth_store } = useContext(Context);
    const { review_store } = useContext(Context);
    let navigate = useNavigate();

    return (
        <>
            <ModalWindow active={active} setActive={setModalActive}>


                <Link key={reviewSlug} to={'/game/' + reviewSlug} className='review-card'>
                    <div className="review-title-container">
                        <span className="game-title">{reviewTitle}</span>
                    </div>
                </Link>
                <div className="review-username-container">
                    <span className="author-username">
                        <span>
                            <Link to={'/' + reviewUsername} className='review-card'>
                                {reviewUsername}
                            </Link>
                        </span>
                        <span>
                            Поставил(а) игре
                        </span>
                        <span className='user-game-grade'>
                            {reviewGrade}
                        </span>
                    </span>
                </div>
                <div className="review-commen">
                    <span className="review-comment">
                        {reviewComment}
                    </span>
                </div>

                <div className="like-count-container">
                    <span>
                        Оценить
                    </span>
                    {auth_store.isAuth ? <>
                        <input onClick={() => { review_store.likeReview(0, 4, true, reviewId, null) }} className="custom-checkbox-comment like" type='checkbox' id={reviewId} name={reviewId} value="red" defaultChecked={reviewHasAuthorLike === 1 ? true : false} />
                        <label htmlFor={reviewId}></label></> :
                        <>
                            <input className="custom-checkbox-comment like" type="checkbox" id='unauthorize' name='unauthorize' value="red" onClick={() => navigate('/login')} />
                            <label htmlFor='unauthorize'></label>
                        </>}
                    <span>{reviewLikeCount}</span>
                </div>
            </ModalWindow>
            <div className="review-card-container" onClick={() => setModalActive(true)}>
                <div className="background-wrap"></div>
                <img src={reviewCover} />
                <div className="review-info-container ">
                    <div className="review-info-background">

                        <Link key={reviewSlug} to={'/game/' + reviewSlug} className='review-card'>
                            <div className="review-title-container">
                                <span className="game-title">{reviewTitle}</span>
                            </div>
                        </Link>

                        <div className="review-username-container">
                            <span className="author-username">
                                <span>
                                    <Link to={'/' + reviewUsername} className='review-card'>
                                        {reviewUsername}
                                    </Link>
                                </span>
                                <span>
                                    Поставил(а) игре
                                </span>
                                <span className='user-game-grade'>
                                    {reviewGrade}
                                </span>
                            </span>
                        </div>
                        <div className="review-comment-container">
                            <span className="review-comment-text">
                                {reviewComment}
                            </span>
                        </div>
                        <div className="review-username-container">
                            <span className="author-username">
                                <span>
                                    Оценили
                                </span>
                                <span className='user-game-grade'>
                                    <span>{reviewLikeCount}</span>
                                </span>
                                <span>
                                    раз
                                </span>
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}