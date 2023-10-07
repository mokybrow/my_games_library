import React, { FC, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GameService from '../service/GameService';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { FormattedDate, FormattedMessage, FormattedNumber } from 'react-intl';

const GameProfile: FC = () => {

    const { slug } = useParams<string>();
    const { games_store } = useContext(Context);
    const { auth_store } = useContext(Context);


    useEffect(() => {
        games_store.getGameData(String(slug))
    }, [])


    const [isOpen, setOpen] = useState(false);
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);

    const rateGame = (index: number) => {
        GameService.addReview(games_store.gameProfile.id, index)
        setRating(index)
    }

    const isOpenMove = () => {
        setOpen(!isOpen)
        setRating(Number(games_store.userGrade.grade))
        setHover(Number(games_store.userGrade.grade))
    }

    const addGameToPassed = async () => {
        const response = await GameService.operationWithPassed(games_store.gameProfile.id);

    }
    const addGameToLiked = async () => {
        const response = await GameService.operationWithLiked(games_store.gameProfile.id);

    }
    const addGameToWantPlay = async () => {
        const response = await GameService.operationWithWanted(games_store.gameProfile.id);

    }


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
                <div className="game-profile-cover-container">

                    <img src={games_store.gameProfile?.cover} />
                    <div className="checkbox-card-body">
                        <div className="check-box-panel">
                            <div className="checkbox">
                                <input onClick={addGameToPassed} className="custom-checkbox check" type="checkbox" id="color-1" name="color-1" value="indigo" onChange={()=> games_store.setPassed(!games_store.isPassed)} checked={games_store.isPassed}/>
                                <label  htmlFor="color-1"></label>
                            </div>
                            <div className="checkbox">
                                <input onClick={addGameToLiked} className="custom-checkbox heart" type="checkbox" id="color-2" name="color-2" value="red" onChange={()=> games_store.setLiked(!games_store.isLiked)}  checked={games_store.isLiked}/>
                                <label  htmlFor="color-2"></label>
                            </div>
                            <div className="checkbox">
                                <input onClick={addGameToWantPlay} className="custom-checkbox clock" type="checkbox" id="color-3" name="color-3" value="red" onChange={()=> games_store.setWanted(!games_store.isWanted)} checked={games_store.isWanted}/>
                                <label  htmlFor="color-3"></label>
                            </div>
                            <div className="checkbox">
                                <input className="custom-checkbox plus" type="checkbox" id="color-4" name="color-4" value="red" />
                                <label htmlFor="color-4"></label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='game-profile-platforms-title'>
                    {games_store.gameProfile?.genre?.length == 1 || games_store.gameProfile?.genre?.length == 0 ? <h3><FormattedMessage id="content.gameprofile.genre" /></h3> : <h3>
                        <FormattedMessage id="content.gameprofile.genre.plural" /></h3>}
                </div>
                <div className='game-profile-platforms'>
                    {games_store.gameProfile?.genre?.length >= 1 ?
                        <> {games_store.gameProfile?.genre?.map(y => <p key={y.id}>{y.name}</p>)}</> : <p><FormattedMessage id="content.gameprofile.nodata" /></p>
                    }
                </div>
                <div className='game-profile-platforms-title'>
                    {games_store.gameProfile?.platform?.length == 1 || games_store.gameProfile?.platform?.length == 0 ? <h3><FormattedMessage id="content.gameprofile.platform" /></h3> : <h3><FormattedMessage id="content.gameprofile.platform.plural" /></h3>}
                </div>

                <div className='game-profile-platforms'>
                    {games_store.gameProfile?.platform?.length >= 1 ?
                        <> {games_store.gameProfile?.platform?.map(x => <p key={x.platform.id}>{x.platform.name}</p>)}</> : <p><FormattedMessage id="content.gameprofile.nodata" /></p>}
                </div>
                {!auth_store.isAuth ? null :
                    <div className='game-profile-grade'>
                        <p onClick={() => { isOpenMove() }}><FormattedMessage id="content.gameprofile.estimate" /></p>

                        <div className={`star-rating ${isOpen ? 'active' : ''}`}>
                            {[...Array(10)].map((star, index) => {
                                index += 1;
                                return (
                                    <button
                                        id='start-button'
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

                <div className="inline-container-title">
                    <p className='game-profile-title'>{games_store.gameProfile?.title}</p>

                    <div className="grade-container">
                        {games_store.gameAvgRate.avg_rate <= 5 ? <span className='rate-star' style={{ color: "#FF0000" }}>&#9733;</span> : games_store.gameAvgRate.avg_rate >= 6 && games_store.gameAvgRate.avg_rate <= 8 ? <span className='rate-star' style={{ color: "#00A000" }}>&#9733;</span> : games_store.gameAvgRate.avg_rate >= 8 ? <span className='rate-star' style={{ color: "#1349C9" }}>&#9733;</span> : null}
                        {games_store.gameAvgRate.avg_rate !== null ? <h3 className='grade-border'><FormattedNumber
                            value={games_store.gameAvgRate.avg_rate}
                        /></h3> : <h3 className='grade-border'><FormattedMessage id="content.gameprofile.nodata" /></h3>}
                    </div>

                </div>

                <p className='game-profile-release'><FormattedMessage id="content.gameprofile.releasedate" />&nbsp;
                    <FormattedDate
                        value={games_store.gameProfile?.release}
                        year='numeric'
                        month='long'
                        day='numeric'
                    />
                </p>
                {games_store.gameProfile?.description != null ?
                    <p className='game-profile-desription'>{games_store.gameProfile?.description}</p> :
                    <p className='game-profile-desription'>Описания нет, но скоро появится. </p>}
            </div>

            <div className="reviews-container">
                <p className='reviews-title'><FormattedMessage id="content.gameprofile.header" /></p>
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
                                <p className='passed-date'><FormattedMessage id="content.gameprofile.commentdate" />&nbsp;
                                    <FormattedDate
                                        value={x.created_at}
                                        year='numeric'
                                        month='long'
                                        day='numeric'
                                    />
                                </p>

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