import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import GameService from '../service/GameService';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { FormattedDate, FormattedMessage, FormattedNumber } from 'react-intl';


const GameProfile: FC = () => {

    const { slug } = useParams<string>();
    const { games_store } = useContext(Context);
    const { auth_store } = useContext(Context);
    let navigate = useNavigate();


    useEffect(() => {
        games_store.getGameData(String(slug))
    }, [])


    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [isOpen, setOpen] = useState(false);

    const rateGame = (index: number, comment: string | null) => {
        GameService.addReview(games_store.gameProfile.id, index, comment)
    }

    const isOpenMove = () => {
        setOpen(!isOpen)
        setRating(Number(games_store.userGrade?.grade))
        setHover(Number(games_store.userGrade?.grade))
    }
    const closeGradeBanner = () => {
        if (isOpen == true) {
            setOpen(!isOpen)
        }
    }

    const deleteGrade = () => {
        console.log('delete')
        GameService.deleteUserRate(games_store.gameProfile.id)
    }

    const addGameToPassed = async () => {
        await GameService.operationWithPassed(games_store.gameProfile.id);

    }
    const addGameToLiked = async () => {
        await GameService.operationWithLiked(games_store.gameProfile.id);

    }
    const addGameToWantPlay = async () => {
        await GameService.operationWithWanted(games_store.gameProfile.id);
    }

    const likeToComment = async (review_id: string) => {

        await GameService.likeToUserComment(String(review_id))
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
        <section className='game-profile-section' onClick={() => { closeGradeBanner() }}>
            <div className="game-cover-grade-container">
                <div className="game-profile-cover-container">
                {games_store.gameProfile?.cover!= null ? <img src={games_store.gameProfile?.cover} alt=''/>: <img src={require('../icons/img-not-found.png')} alt=''/>}

                    <div className="checkbox-card-body-desktop">
                        <div className="check-box-panel">
                            <div className="checkbox">
                                <input onClick={addGameToPassed} className="custom-checkbox check" type="checkbox" id="color-1" name="color-1" value="indigo" onChange={() => games_store.setPassed(!games_store.isPassed)} checked={games_store.isPassed} />
                                <label htmlFor="color-1"></label>
                            </div>
                            <div className="checkbox">
                                <input onClick={addGameToLiked} className="custom-checkbox heart" type="checkbox" id="color-2" name="color-2" value="red" onChange={() => games_store.setLiked(!games_store.isLiked)} checked={games_store.isLiked} />
                                <label htmlFor="color-2"></label>
                            </div>
                            <div className="checkbox">
                                <input onClick={addGameToWantPlay} className="custom-checkbox clock" type="checkbox" id="color-3" name="color-3" value="red" onChange={() => games_store.setWanted(!games_store.isWanted)} checked={games_store.isWanted} />
                                <label htmlFor="color-3"></label>
                            </div>
                            <div className="checkbox">
                                <input className="custom-checkbox plus" type="checkbox" id="color-4" name="color-4" value="red" />
                                <label htmlFor="color-4"></label>
                            </div>
                        </div>
                    </div>
                </div>

                {!auth_store.isAuth ? null :
                    <>
                        {games_store?.userGrade?.grade > 0 ?
                            <div onClick={() => { isOpenMove() }} className='game-profile-grade'>
                                <span><FormattedMessage id="content.gameprofile.yourestimate" />&nbsp;{games_store.userGrade.grade}</span>
                            </div> :
                            <div onClick={() => { isOpenMove() }} className='game-profile-grade'>
                                <span><FormattedMessage id="content.gameprofile.estimate" /></span>
                            </div>}

                        <div className={`grade-numbers ${isOpen ? 'active' : ''}`}>
                            {[...Array(10)].map((star, index) => {
                                index += 1;
                                return (
                                    <span
                                        id='rate-numbers'
                                        key={index}
                                        className={index <= (hover || rating) && index < 5 ? "red-rate" : index <= (hover || rating) && index <= 6 ? "gray-rate" : index <= (hover || rating) && index >= 6 ? "green-rate" : "off"}
                                        onClick={() => { { rateGame(Number(index), null) } { setRating(index) } { setOpen(!isOpen) } { games_store.userGrade.grade = index } }}
                                        onMouseEnter={() => setHover(index)}
                                        onMouseLeave={() => setHover(rating)}

                                    >{index}
                                    </span>
                                );
                            })}
                        </div>
                        {games_store?.userGrade?.grade > 0 ?
                            <div onClick={() => { { deleteGrade() } { setOpen(!isOpen) } { setRating(0) } { games_store.userGrade.grade = 0 } }} className={`delete-grade ${isOpen ? 'active' : ''}`}>
                                <span><FormattedMessage id="content.gameprofile.deleteestimate" /></span>
                            </div> : null}
                    </>}
            </div>
            <div className="checkbox-card-body-mobile">
                <div className="check-box-panel">
                    <div className="checkbox">
                        <input onClick={addGameToPassed} className="custom-checkbox check" type="checkbox" id="color-1" name="color-1" value="indigo" onChange={() => games_store.setPassed(!games_store.isPassed)} checked={games_store.isPassed} />
                        <label htmlFor="color-1"></label>
                    </div>
                    <div className="checkbox">
                        <input onClick={addGameToLiked} className="custom-checkbox heart" type="checkbox" id="color-2" name="color-2" value="red" onChange={() => games_store.setLiked(!games_store.isLiked)} checked={games_store.isLiked} />
                        <label htmlFor="color-2"></label>
                    </div>
                    <div className="checkbox">
                        <input onClick={addGameToWantPlay} className="custom-checkbox clock" type="checkbox" id="color-3" name="color-3" value="red" onChange={() => games_store.setWanted(!games_store.isWanted)} checked={games_store.isWanted} />
                        <label htmlFor="color-3"></label>
                    </div>
                    <div className="checkbox">
                        <input className="custom-checkbox plus" type="checkbox" id="color-4" name="color-4" value="red" />
                        <label htmlFor="color-4"></label>
                    </div>
                </div>
            </div>
            <div className="game-title-container-mobile">
                <h1 className='game-profile-title'>{games_store.gameProfile?.title}</h1>
                <div className="grade-container">
                    {games_store.gameAvgRate.avg_rate <= 5 ? <span className='rate-star' style={{ color: "#FF0000" }}>&#9733;</span> : games_store.gameAvgRate.avg_rate >= 6 && games_store.gameAvgRate.avg_rate <= 8 ? <span className='rate-star' style={{ color: "#00A000" }}>&#9733;</span> : games_store.gameAvgRate.avg_rate >= 8 ? <span className='rate-star' style={{ color: "#1349C9" }}>&#9733;</span> : null}
                    {games_store.gameAvgRate.avg_rate !== null ? <span className='grade-border'><FormattedNumber
                        value={games_store.gameAvgRate.avg_rate}
                    /></span> : <span className='grade-border'><FormattedMessage id="content.gameprofile.nodata" /></span>}
                </div>
            </div>
            <div className="description-container-mobile">
                <span className='game-profile-release'><FormattedMessage id="content.gameprofile.releasedate" />&nbsp;
                    <FormattedDate
                        value={games_store.gameProfile?.release}
                        year='numeric'
                        month='long'
                        day='numeric'
                    />
                </span>
                <h2>Описание</h2>
                {games_store.gameProfile?.description != null ?
                    <p className='game-profile-desription'>{games_store.gameProfile?.description}</p> :
                    <p className='game-profile-desription'><FormattedMessage id="content.gameprofile.placeholder" /> </p>}

                <div className="inline-info-block">
                    <div className='game-profile-platforms genre'>
                        {games_store.gameProfile?.genre?.length >= 1 ?
                            <> {games_store.gameProfile?.genre?.map(y => <span key={y.id}>{y.name}.</span>)}</> : <span><FormattedMessage id="content.gameprofile.nodata" /></span>
                        }
                    </div>

                    <div className='game-profile-platforms'>
                        {games_store.gameProfile?.platform?.length >= 1 ?
                            <> {games_store.gameProfile?.platform?.map(x => <span key={x.platform.id}>{x.platform.name}.&nbsp;</span>)}</> : <span><FormattedMessage id="content.gameprofile.nodata" /></span>}
                    </div>
                </div>

            </div>
            <div className="game-info-container-desktop">
                <div className="game-title-container">
                    <h1 className='game-profile-title'>{games_store.gameProfile?.title}</h1>
                    <div className="grade-container">
                        {games_store.gameAvgRate.avg_rate <= 5 ? <span className='rate-star' style={{ color: "#FF0000" }}>&#9733;</span> : games_store.gameAvgRate.avg_rate >= 6 && games_store.gameAvgRate.avg_rate <= 8 ? <span className='rate-star' style={{ color: "#00A000" }}>&#9733;</span> : games_store.gameAvgRate.avg_rate >= 8 ? <span className='rate-star' style={{ color: "#1349C9" }}>&#9733;</span> : null}
                        {games_store.gameAvgRate.avg_rate !== null ? <span className='grade-border'><FormattedNumber
                            value={games_store.gameAvgRate.avg_rate}
                        /></span> : <span className='grade-border'><FormattedMessage id="content.gameprofile.nodata" /></span>}
                    </div>
                </div>
                <div className="description-container">
                    <span className='game-profile-release'><FormattedMessage id="content.gameprofile.releasedate" />&nbsp;
                        <FormattedDate
                            value={games_store.gameProfile?.release}
                            year='numeric'
                            month='long'
                            day='numeric'
                        />
                    </span>
                    <div className='description-block'>
                        <h2>Описание</h2>
                        {games_store.gameProfile?.description != null ?
                            <p className='game-profile-desription'>{games_store.gameProfile?.description}</p> :
                            <p className='game-profile-desription'><FormattedMessage id="content.gameprofile.placeholder" /> </p>}
                    </div>
                    <div className="inline-info-block">
                        <div className='game-profile-platforms genre'>
                            {games_store.gameProfile?.genre?.length >= 1 ?
                                <> {games_store.gameProfile?.genre?.map(y => <span key={y.id}>{y.name}.</span>)}</> : <span><FormattedMessage id="content.gameprofile.nodata" /></span>
                            }
                        </div>

                        <div className='game-profile-platforms'>
                            {games_store.gameProfile?.platform?.length >= 1 ?
                                <> {games_store.gameProfile?.platform?.map(x => <span key={x.platform.id}>{x.platform.name}.&nbsp;</span>)}</> : <span><FormattedMessage id="content.gameprofile.nodata" /></span>}
                        </div>
                    </div>

                </div>
            </div>

            <div className="reviews-container">
                <h1 className='reviews-title'><FormattedMessage id="content.gameprofile.header" /></h1>
                <hr className='drop-down-line-game-profile' />
                <div className='reviews-comment-container'>

                    {games_store.reviews?.map(x =>
                        <div className="comment-container" key={x.id}>
                            <div className="inline-container">
                                {x.img == null || x.img == '' ? <img className="user-in-comment-img" src={require('../icons/user.png')} /> :

                                    <img className="user-in-comment-img" src={String(x.img)} />}

                                <h3>{x.username}</h3>
                                <div className="grade-container">
                                    {x.grade <= 5 ? <span className='rate-star' style={{ color: "#FF0000" }}>&#9733;</span> : x.grade >= 6 && x.grade <= 8 ? <span className='rate-star' style={{ color: "#00A000" }}>&#9733;</span> : x.grade >= 8 ? <span className='rate-star' style={{ color: "#1349C9" }}>&#9733;</span> : null}
                                    <span className='grade-border'>{x.grade}</span>
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
                            <div className="like-count-container">
                                <span>{x.review_likes}</span>
                                {auth_store.isAuth ? <>
                                    <input onClick={() => { likeToComment(x.review_id) }} onChange={() => x.hasAuthorLike == 1 ? (x.hasAuthorLike = 0) & (x.review_likes = x.review_likes - 1) : (x.hasAuthorLike = 1) & (x.review_likes = x.review_likes + 1)} className="custom-checkbox-comment like " type="checkbox" id={x.id} name={x.id} value="red" checked={x.hasAuthorLike == 1 ? true : false} />
                                    <label htmlFor={x.id}></label></> :
                                    <>
                                        <input className="custom-checkbox-comment like" type="checkbox" id='unauthorize' name='unauthorize' value="red" onClick={() => navigate('/login')} />
                                        <label htmlFor='unauthorize'></label></>}

                            </div>
                            <hr className='drop-down-line-game-profile' />

                        </div>
                    )}
                </div>


            </div>

        </section >
    )
}

export default observer(GameProfile);