import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { Context } from '../..';
import '../../styles/user-profile.css'
import { ActionButton } from '../../components/buttons/action-button';
import { ListCard } from '../../components/listcard/list-card';
import { useParams } from 'react-router-dom';
import { GameCard } from '../../components/gamecard/game-card';
import { ReviewCard } from '../../components/reviewcard/review-card';
import { UnactiveUser } from '../../components/unactiveuser/unactive-user';

const UserProfile = () => {

    const { auth_store } = useContext(Context);
    const { user_store } = useContext(Context);
    const { username } = useParams<string>();
    useEffect(() => {

        const checkUsername = async () => {
            const response = await auth_store.checkAuth()
            return response
        }
        checkUsername().then(function (value: any) {
            if (value.toLowerCase() !== String(username).toLowerCase()) {
                user_store.findUser(String(username), 0, 6)

            } else {
                user_store.getMyProfileFunc(auth_store.user.id, 0, 6)
            }
        })

    }, [])

    const handleClick = () => {
        user_store.followController(String(username))
    };
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
                    <ListCard children={''} linkTo={'favorite'} img={'icon.png'} />
                    <ListCard children={''} linkTo={'wishlist'} img={'icon.png'} />
                    <ListCard children={''} linkTo={'completed'} img={'icon.png'} />
                    <ListCard children={''} linkTo={'lists'} img={'icon.png'} />
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

export default observer(UserProfile);