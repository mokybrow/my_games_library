import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../..';
import '../../styles/user-profile.css'
import { ActionButton } from '../../components/buttons/action-button';
import { ListCard } from '../../components/listcard/list-card';
import { useParams } from 'react-router-dom';
import { ReviewCard } from '../../components/reviewcard/review-card';
import { UnactiveUser } from '../../components/unactiveuser/unactive-user';
import GameCard from '../../components/gamecard/game-card';
import { FollowButton } from '../../components/buttons/follow-button';
import { NotFoundPage } from '../../components/not_found_page/not-found-page';

const UserProfile = () => {
    const { auth_store } = useContext(Context);
    const { user_store } = useContext(Context);
    const { username } = useParams<string>();
    const [whois, setWhoIs] = useState('');

    useEffect(() => {

        if (auth_store.user.username !== undefined){
            if (auth_store.user.username.toLowerCase() !== String(username).toLowerCase()){
                user_store.findUser(String(username), 0, 6)
            }
            else {
                setWhoIs('myself')
                user_store.getMyProfileFunc(auth_store.user.id, 0, 6)
            }
        }

    }, [auth_store.user.username])

    const handleClick = () => {
        user_store.followController(String(username))
    };
    if (user_store.isLoading || auth_store.isLoading) {
        return (
            <div className='loading-page'>
                <img src={require('../../assets/img/dude.jpeg')} alt="Dude" />
            </div>
        )
    }
    // if (auth_store.user.id !== undefined){
    //     if (auth_store.user.username.toLowerCase() === String(username).toLowerCase()){
    //         return (
    //             <section className='user-profile-page'>
    
    //                 <div className="user-info-grid-container">
    //                     <div className="user-banner info" >
    //                         <div className="user-profile-cover-container">
    //                             {auth_store.user.img == null ?
    //                                 <img src={require('../../assets/icons/icon.png')} width={100} height={100} />
    //                                 :
    //                                 <img src={"data:image/jpeg;base64," + auth_store.user.img} width={100} height={100} />
    //                             }
    //                         </div>
    //                         <div className='user-profile-info-container'>
    //                             <span className='user-name'>{auth_store.user.name}</span>
    //                         </div>
    //                     </div>
    //                     <div className="user-banner stat">
    //                         <div className="stat-wrapper">
    //                             <span className='stat-count'>{auth_store.user.passed_game_count}</span>
    //                             <span className='stat-title'>Пройденно</span>
    //                         </div>
    //                         <div className="stat-wrapper">
    //                             <span className='stat-count'>{auth_store.user.wanted_game_count}</span>
    //                             <span className='stat-title'>Пройдёт</span>
    //                         </div>
    //                         <div className="stat-wrapper">
    //                             <span className='stat-count'>{auth_store.user.list_count}</span>
    //                             <span className='stat-title'>Списки</span>
    //                         </div>
    
    //                     </div>
    //                     <div className="user-banner actions">
    //                         {auth_store.isAuth && auth_store.user.username.toLowerCase() !== String(username).toLowerCase() ?
    //                             <>
    //                                 {user_store.isFollower ?
    //                                     <ActionButton onClick={handleClick}>
    //                                         Отписаться
    //                                     </ActionButton> :
    //                                     <ActionButton onClick={handleClick}>
    //                                         Подписаться
    //                                     </ActionButton>
    //                                 }
    
    //                             </> :
    //                             auth_store.isAuth && auth_store.user.username.toLowerCase() === String(username).toLowerCase()
    //                                 ? <>
    //                                     <ActionButton onClick={`settings`}>
    //                                         Настройки
    //                                     </ActionButton>
    //                                     <ActionButton onClick={'lists/create'}>
    //                                         Новый список
    //                                     </ActionButton>
    //                                 </> :
    //                                 <ActionButton onClick={undefined}>
    //                                     Подписаться
    //                                 </ActionButton>
    //                         }
    
    //                     </div>
    //                     <div className="user-lists-grid-container">
    //                         <ListCard children={''} linkTo={'favorite'} img={'icon.png'} />
    //                         <ListCard children={''} linkTo={'wishlist'} img={'icon.png'} />
    //                         <ListCard children={''} linkTo={'completed'} img={'icon.png'} />
    //                         <ListCard children={''} linkTo={'lists'} img={'icon.png'} />
    //                     </div>
    //                     <div className="last-activity-grid-container">
    //                         <h1 className='profile-banner-header'>Активность </h1>
    //                         {user_store.userActivity.length > 0 ?
    //                             <>
    //                                 {user_store.userActivity.map((game) =>
    //                                     <div key={game.id}>
    //                                         <GameCard gameId={game.id} gameSlug={game.slug} gameCover={game.cover}
    //                                             gameTitle={game.title} activityType={game.activity_type} />
    //                                     </div>
    //                                 )}
    //                             </>
    //                             : <UnactiveUser>
    //                                 Жив он или нет, мы не знаем
    //                             </UnactiveUser>}
    //                     </div>
    //                     <div className="last-reviews-grid-container">
    //                         <h1 className='profile-banner-header'>Последниe Отзывы</h1>
    //                         {user_store.reviews.length > 0 ?
    //                             <>
    //                                 {user_store.reviews.map((review) =>
    //                                     <div key={review.game_id}>
    //                                         <ReviewCard reviewSlug={review.slug} reviewCover={review.cover} reviewGrade={review.grade} />
    //                                     </div>
    //                                 )}
    //                             </>
    //                             : <UnactiveUser>
    //                                 Пользователь пока ничего не прокомментировал
    //                             </UnactiveUser>}
    //                     </div>
    //                 </div>
    //             </section>
    
    //         )
    //     }
    // }
    if (whois == 'myself') {
        return (
            <section className='user-profile-page'>

                <div className="user-info-grid-container">
                    <div className="user-banner info" >
                        <div className="user-profile-cover-container">
                            {auth_store.user.img == null ?
                                <img src={require('../../assets/icons/icon.png')} width={100} height={100} />
                                :
                                <img src={"data:image/jpeg;base64," + auth_store.user.img} width={100} height={100} />
                            }
                        </div>
                        <div className='user-profile-info-container'>
                            <span className='user-name'>{auth_store.user.name}</span>
                        </div>
                    </div>
                    <div className="user-banner stat">
                        <div className="stat-wrapper">
                            <span className='stat-count'>{auth_store.user.passed_game_count}</span>
                            <span className='stat-title'>Пройденно</span>
                        </div>
                        <div className="stat-wrapper">
                            <span className='stat-count'>{auth_store.user.wanted_game_count}</span>
                            <span className='stat-title'>Пройдёт</span>
                        </div>
                        <div className="stat-wrapper">
                            <span className='stat-count'>{auth_store.user.list_count}</span>
                            <span className='stat-title'>Списки</span>
                        </div>

                    </div>
                    <div className="user-banner actions">
                        {auth_store.isAuth && auth_store.user.username.toLowerCase() !== String(username).toLowerCase() ?
                            <>
                                {user_store.isFollower ?
                                    <ActionButton onClick={handleClick}>
                                        Отписаться
                                    </ActionButton> :
                                    <ActionButton onClick={handleClick}>
                                        Подписаться
                                    </ActionButton>
                                }

                            </> :
                            auth_store.isAuth && auth_store.user.username.toLowerCase() === String(username).toLowerCase()
                                ? <>
                                    <ActionButton onClick={`settings`}>
                                        Настройки
                                    </ActionButton>
                                    <ActionButton onClick={'lists/create'}>
                                        Новый список
                                    </ActionButton>
                                </> :
                                <ActionButton onClick={undefined}>
                                    Подписаться
                                </ActionButton>
                        }

                    </div>
                    <div className="user-lists-grid-container">
                    <ListCard children={''} linkTo={'favorite'} img={'favorite.png'} />
                        <ListCard children={''} linkTo={'wishlist'} img={'wishlist.png'} />
                        <ListCard children={''} linkTo={'completed'} img={'completed.png'} />
                        <ListCard children={''} linkTo={'lists'} img={'mylists.png'} />
                    </div>
                    <div className="last-activity-grid-container">
                        <h1 className='profile-banner-header'>Активность </h1>
                        {user_store.userActivity.length > 0 ?
                            <>
                                {user_store.userActivity.map((game) =>
                                    <div key={game.id}>
                                        <GameCard gameId={game.id} gameSlug={game.slug} gameCover={game.cover}
                                            gameTitle={game.title} activityType={game.activity_type} />
                                    </div>
                                )}
                            </>
                            : <UnactiveUser>
                                Жив он или нет, мы не знаем
                            </UnactiveUser>}
                    </div>
                    <div className="last-reviews-grid-container">
                        <h1 className='profile-banner-header'>Последниe Отзывы</h1>
                        {user_store.reviews.length > 0 ?
                            <>
                                {user_store.reviews.map((review) =>
                                    <div key={review.game_id}>
                                        <ReviewCard reviewSlug={review.slug} reviewCover={review.cover} reviewGrade={review.grade} />
                                    </div>
                                )}
                            </>
                            : <UnactiveUser>
                                Пользователь пока ничего не прокомментировал
                            </UnactiveUser>}
                    </div>
                </div>
            </section>

        )
    }
    if (user_store.user.id !== undefined) {
        return (
            <section className='user-profile-page'>

                <div className="user-info-grid-container">
                    <div className="user-banner info" >
                        <div className="user-profile-cover-container">
                            {user_store.user.img == null ?
                                <img src={require('../../assets/icons/icon.png')} width={100} height={100} />
                                :
                                <img src={"data:image/jpeg;base64," + user_store.user.img} width={100} height={100} />
                            }
                        </div>
                        <div className='user-profile-info-container'>
                            <span className='user-name'>{user_store.user.name}</span>
                        </div>
                    </div>
                    <div className="user-banner stat">
                        <div className="stat-wrapper">
                            <span className='stat-count'>{user_store.user.passed_game_count}</span>
                            <span className='stat-title'>Пройденно</span>
                        </div>
                        <div className="stat-wrapper">
                            <span className='stat-count'>{user_store.user.wanted_game_count}</span>
                            <span className='stat-title'>Пройдёт</span>
                        </div>
                        <div className="stat-wrapper">
                            <span className='stat-count'>{user_store.user.list_count}</span>
                            <span className='stat-title'>Списки</span>
                        </div>

                    </div>
                    <div className="user-banner actions">
                        {auth_store.isAuth && auth_store.user.username.toLowerCase() !== String(username).toLowerCase() ?
                            <>
                                {user_store.isFollower ?
                                    <FollowButton onClick={handleClick}>
                                        Отписаться
                                    </FollowButton> :
                                    <FollowButton onClick={handleClick}>
                                        Подписаться
                                    </FollowButton>
                                }
                            </> : null
                        }

                    </div>
                    <div className="user-lists-grid-container">
                        <ListCard children={''} linkTo={'favorite'} img={'favorite.png'} />
                        <ListCard children={''} linkTo={'wishlist'} img={'wishlist.png'} />
                        <ListCard children={''} linkTo={'completed'} img={'completed.png'} />
                        <ListCard children={''} linkTo={'lists'} img={'mylists.png'} />
                    </div>
                    <div className="last-activity-grid-container">
                        <h1 className='profile-banner-header'>Активность </h1>
                        {user_store.userActivity.length > 0 ?
                            <>
                                {user_store.userActivity.map((game) =>
                                    <div key={game.id}>
                                        <GameCard gameId={game.id} gameSlug={game.slug} gameCover={game.cover}
                                            gameTitle={game.title} activityType={game.activity_type} />
                                    </div>
                                )}
                            </>
                            : <UnactiveUser>
                                Жив он или нет, мы не знаем
                            </UnactiveUser>}
                    </div>
                    <div className="last-reviews-grid-container">
                        <h1 className='profile-banner-header'>Последниe Отзывы</h1>
                        {user_store.reviews.length > 0 ?
                            <>
                                {user_store.reviews.map((review) =>
                                    <div key={review.game_id}>
                                        <ReviewCard reviewSlug={review.slug} reviewCover={review.cover} reviewGrade={review.grade} />
                                    </div>
                                )}
                            </>
                            : <UnactiveUser>
                                Пользователь пока ничего не прокомментировал
                            </UnactiveUser>}
                    </div>
                </div>
            </section>
        )
    }
    return (
        <NotFoundPage/>
    )

}

export default observer(UserProfile);