import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect } from 'react'
import { getLocalToken } from '../utils/utils';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '..';
import '../styles/game-profile.css'
import GameCard from '../components/gamecard/game-card';
import CommentCard from '../components/comment/comment';
import CheckboxPannel from '../components/checkboxpannel/checkbox-pannel';
import AddReview from '../components/addreview/add-review';

const GamePage = () => {
    const { slug } = useParams<string>();
    const { games_store } = useContext(Context);
    const { auth_store } = useContext(Context);
    const { user_store } = useContext(Context);
    let navigate = useNavigate();

    useEffect(() => {
        games_store.getGameData(String(slug))
        games_store.getReviewsFunc(0, 6, false, String(slug))

        if (getLocalToken()) {
            const getUserLists = async () => {
                const response = await auth_store.checkAuth()
                return response
            }
            getUserLists().then(function () {
                user_store.getUserListsFunc(auth_store.user.id)
            }
            )
        }
    }, [games_store, slug, auth_store])

    if (games_store.isLoading){
        return(
            <div className='loading-page'>
                <img src={require('../assets/img/dude.jpeg')} alt="Dude" />
                </div>
        )
    }
    return (
        <section className='game-profile-page-section'>

            <div className="background-image-container-shadow">
            </div>

            <div className="background-image-container">
                <img src={games_store.gameProfile.cover} alt="" />
            </div>

            <div className="game-profile-grid">
                <div className='active-wrapper'>
                    <img src={games_store.gameProfile.cover} alt="" className='game-cover' />
                    {games_store.gameInLists.liked === undefined ? null :
                        <CheckboxPannel
                            inPassed={games_store.gameInLists.passed}
                            inLiked={games_store.gameInLists.liked}
                            inWishlist={games_store.gameInLists.wishilst} />}
                    <AddReview />
                </div>
                <div className="grid-profile-info">
                    <div className='game-profile-info-container'>
                        <div className='info-container'>
                            <h1 className="game-profile-title">{games_store.gameProfile.title}
                                <span className='game-profile-avgrate'>
                                    {Number(games_store.gameProfile.avg_rate) !== 0 && Number(games_store.gameProfile.avg_rate) ?
                                        Number(games_store.gameProfile.avg_rate) :
                                        "Н/Д"
                                    }
                                </span>
                            </h1>


                            <p>{games_store.gameProfile.release?.toString()}</p>
                        </div>
                        <div className='info-container'>
                            <p>{!games_store.gameProfile.description ? 'Описания нет но скоро будет' : games_store.gameProfile.description}</p>
                        </div>
                    </div>
                    <div className="comment-wrapper">
                        <h1 className="game-profile-title">Последние Отзывы</h1>
                        {games_store.reviews?.length > 0 ?
                        <>
                        {games_store.reviews?.map(review =>
                            <div key={review.id}>
                                <CommentCard
                                    reviewId={review.id}
                                    reviewImg={review.img}
                                    reviewUsername={review.username}
                                    reviewGrade={review.grade}
                                    reviewCommnet={review.comment}
                                    reviewLikeCount={review.like_count}
                                    reviewHasAuthorLike={Number(review.hasAuthorLike)} />
                            </div>
                        )}</> : null}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default observer(GamePage);