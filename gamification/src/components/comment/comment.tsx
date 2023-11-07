import React, { FC, useContext } from 'react'
import './comment.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from '../..'
import { observer } from 'mobx-react-lite'

export interface CommentCard {
    reviewId: string
    reviewImg: string
    reviewUsername: string
    reviewGrade: number
    reviewCommnet: string
    reviewLikeCount: number
    reviewHasAuthorLike: number
}

const CommentCard: FC<CommentCard> = ({ reviewId, reviewImg, reviewUsername, reviewGrade, reviewCommnet, reviewLikeCount, reviewHasAuthorLike }) => {
    const { games_store } = useContext(Context);
    const { auth_store } = useContext(Context);
    const { user_store } = useContext(Context);
    const { slug } = useParams<string>();
    let navigate = useNavigate();

    return (
        <div className="comment-container">
            <div className="inline-container">
                {reviewImg == null ?
                    <img src={require('../../assets/icons/icon.png')} className="user-in-comment-img" width={100} height={100} />
                    :
                    <img src={"data:image/jpeg;base64," + reviewImg} className="user-in-comment-img" width={100} height={100} />
                }

                <Link to={'/' + reviewUsername}><h3>{reviewUsername}</h3></Link>
                <div className="grade-container">
                    {reviewGrade <= 5 ? <span className='rate-star' style={{ color: "#FF0000" }}>&#9733;</span> : reviewGrade >= 6 && reviewGrade <= 8 ?
                        <span className='rate-star' style={{ color: "#00A000" }}>&#9733;</span> : reviewGrade >= 8 ?
                            <span className='rate-star' style={{ color: "#1349C9" }}>&#9733;</span> : null}

                    <span className='grade-border'>{reviewGrade}</span>
                </div>

            </div>

            <p className='comment-text'>{reviewCommnet}</p>
            <div className="like-count-container">
                <span>{reviewLikeCount}</span>
                {auth_store.isAuth ? <>
                    <input onClick={() => { games_store.likeReview(0, 6, false, reviewId, String(slug)) }}
                        className="custom-checkbox-comment like " type="checkbox" id={reviewId} name={reviewId}
                        value="red" defaultChecked={reviewHasAuthorLike === 1 ? true : false} />

                    <label htmlFor={reviewId}></label></> :
                    <>
                        <input className="custom-checkbox-comment like" type="checkbox"
                            id='unauthorize' name='unauthorize' value="red"
                            onClick={() => navigate('/login')} />
                        <label htmlFor='unauthorize'></label></>}
            </div>
            <hr className='drop-down-line-game-profile' />
        </div>
    )
}

export default observer(CommentCard);