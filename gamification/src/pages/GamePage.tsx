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
import { UnactiveUser } from '../components/unactiveuser/unactive-user';
import { NotFoundPage } from '../components/not_found_page/not-found-page';
import { InfoBanner } from '../components/infobanner/info-banner';
import Loader from '../components/loader/loader';
import { FormattedDate } from 'react-intl';

const GamePage = () => {
    const { slug } = useParams<string>();
    const { games_store } = useContext(Context);
    const { auth_store } = useContext(Context);
    const { user_store } = useContext(Context);

    useEffect(() => {
        window.scrollTo(0, 0);
        games_store.getGameData(String(slug))
        if (games_store.gameProfile.id !== undefined) {
            games_store.getReviewsFunc(0, 6, false, String(slug), auth_store.user.id, games_store.gameProfile.id)
        }
        if (getLocalToken()) {
            if (auth_store.user.id !== undefined) {
                user_store.getUserListsFunc(auth_store.user.id)
            }
        }
    }, [games_store.gameProfile.id, slug, auth_store.user.id])

    if (games_store.isLoading) {
        return (
            <Loader />
        )
    }

    if (games_store.gameProfile.id !== undefined) {
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

                        <CheckboxPannel
                            inPassed={games_store.gameInLists.passed}
                            inLiked={games_store.gameInLists.liked}
                            inWishlist={games_store.gameInLists.wishilst} />
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
                                {games_store.gameProfile.release !== undefined ?
                                <div>
                                <span>Дата выхода: </span>
                                    <FormattedDate
                                        value={games_store.gameProfile.release}
                                        year='numeric'
                                        month='short'
                                        day='numeric'
                                    />
                                   </div> : null
                                }
                            </div>
                            <div className='description-container'>
                                <p>{!games_store.gameProfile.description ? 'Описания нет но скоро будет' : games_store.gameProfile.description}</p>
                            </div>
                            <div className='other-game-info'>
                                <ul>
                                    <span>Жанр:</span>

                                    {games_store.gameProfile.genre.length > 0 ?
                                        <>{games_store.gameProfile.genre.map(genre =>
                                            <li key={genre}>
                                                {genre}
                                            </li>)}</> : null}
                                </ul>
                                <ul>
                                    <span>Где играть:</span>

                                    {games_store.gameProfile.platform.length > 0 ?
                                        <>{games_store.gameProfile.platform.map(platform =>
                                            <li key={platform}>
                                                {platform}
                                            </li>)}</> : null}
                                </ul>
                                <ul>
                                    <span>Возраст:</span>
                                        <li>{games_store.gameProfile.esrb_rating}</li>
                                </ul>
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
                                    )}</> :
                                <InfoBanner>Будь первым кто оставит отзыв</InfoBanner>}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
    return (
        <NotFoundPage />
    )

}

export default observer(GamePage);