import React, { FC, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GameService from '../service/GameService';
import { GameProfileResponse, GamesResponse, PlatformPlatform } from '../models/response';
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const GameProfile: FC = () => {
    const { slug } = useParams<string>();
    const { games_store } = useContext(Context);
    const { auth_store } = useContext(Context);

    const [isOpen, setOpen] = useState(false);
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState(0);


    const rateGame = (index: number) => {
        GameService.addReview(games_store.gameProfile.id, index)
        console.log(index)
        setRating(index)
    }
    useEffect(() => {
        games_store.getGameData(String(slug))
    }, [])

    if (games_store.isLoading === true) {
        return (
            <section className='loader-section'>
                <div className="lds-spinner"><div></div>
                    <div></div><div></div>
                    <div></div><div></div><div>
                    </div><div></div><div></div><div
                    ></div><div></div><div></div>
                    <div></div></div>
            </section>

        )
    }

    return (
        <section className='game-profile-section'>
            <div className='left-page-container'>
                <img className='game-profile-cover' src={games_store.gameProfile?.cover} alt="" />
                <div className='game-profile-platforms-title'>
                    {games_store.gameProfile?.genre?.length == 1 || games_store.gameProfile?.genre?.length == 0 ? <h3>Жанр</h3> : <h3>Жанры</h3>}
                </div>
                <div className='game-profile-platforms'>
                    {games_store.gameProfile?.genre?.length >= 1 ?
                        <> {games_store.gameProfile?.genre?.map(y => <p key={y.id}>{y.name}</p>)}</> : <p>Нет данных</p>
                    }
                </div>
                <div className='game-profile-platforms-title'>
                    {games_store.gameProfile?.platform?.length == 1 || games_store.gameProfile?.platform?.length == 0 ? <h3>Платформа</h3> : <h3>Платформы</h3>}
                </div>

                <div className='game-profile-platforms'>
                    {games_store.gameProfile?.platform?.length >= 1 ?
                        <> {games_store.gameProfile?.platform?.map(x => <p key={x.platform.id}>{x.platform.name}</p>)}</> : <p>Нет данных</p>}
                </div>
                {!auth_store.isAuth ? null :
                    <div className='game-profile-grade'>
                        <p  onClick={() => setOpen(!isOpen)}>Оценить</p>

                        <div className={`star-rating ${isOpen ? 'active' : ''}`}>
                            {[...Array(10)].map((star, index) => {
                                index += 1;
                                return (
                                    <button
                                        type="button"
                                        key={index}
                                        className={index <= (hover || rating) ? "on" : "off"}
                                        onClick={() => { rateGame(Number(index)) }}
                                        onMouseEnter={() => setHover(index)}
                                        onMouseLeave={() => setHover(rating)}>
                                        <span className="star">&#9733;</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>}

            </div>
            <div className='game-profile-info'>
                <p className='game-profile-title'>{games_store.gameProfile?.title}</p>

                <div className="inline-container-title">
                    <div className="grade-container">
                        {games_store.gameAvgRate.avg_rate <= 5 ? <span className='rate-star' style={{ color: "#FF0000" }}>&#9733;</span> : games_store.gameAvgRate.avg_rate >= 6 && games_store.gameAvgRate.avg_rate <= 8 ? <span className='rate-star' style={{ color: "#00A000" }}>&#9733;</span> : games_store.gameAvgRate.avg_rate >= 8 ? <span className='rate-star' style={{ color: "#1349C9" }}>&#9733;</span> : null}
                        {games_store.gameAvgRate.avg_rate !== null ? <h3 className='grade-border'>{games_store.gameAvgRate.avg_rate}</h3> : <h3 className='grade-border'>N/A</h3>}
                    </div>

                </div>

                <p className='game-profile-release'>Дата выхода {games_store.gameProfile?.release?.toString()}</p>
            </div>

            <div className="reviews-container">
                <p className='reviews-title'>Отзывы</p>
                <hr className='drop-down-line-game-profile' />
                <div className='reviews-comment-container'>

                    {games_store.reviews?.map(x =>
                        <div className="comment-container" key={x.id}>
                            <div className="inline-container">
                                <img className="user-in-comment-img" src={String(x.img)} />

                                <h3>{x.username}</h3>
                                <div className="grade-container">
                                    {x.grade <= 5 ? <span className='rate-star' style={{ color: "#FF0000" }}>&#9733;</span> : x.grade >= 6 && x.grade <= 8 ? <span className='rate-star' style={{ color: "#00A000" }}>&#9733;</span> : x.grade >= 8 ? <span className='rate-star' style={{ color: "#1349C9" }}>&#9733;</span> : null}
                                    <h3 className='grade-border'>{x.grade}</h3>
                                </div>
                                <p className='passed-date'>Прошёл {x.created_at.toString().split('T')[0]}</p>

                            </div>

                            <p className='comment-text'>{x.comment}</p>
                            <hr className='drop-down-line-game-profile' />

                        </div>
                    )}
                </div>


            </div>

        </section>
    )
}

export default observer(GameProfile);