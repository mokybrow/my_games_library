import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect } from 'react'
import { Context } from '..';
import { Link, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

export const LikedGamesPage: FC = () => {
    const { auth_store } = useContext(Context);
    const { user_store } = useContext(Context);
    const { username } = useParams<string>();

    useEffect(() => {
        const checkUsername = async () => {
            const response = await auth_store.checkAuth()

            return response
        }
        checkUsername().then(function (value: any) {
            if (value !== String(username)) {
                user_store.findUser(String(username))
                console.log('Это не я')
            }
            else {
                auth_store.getMyProfileFunc()
            }
        })

    }, [])


    //Пользователь залогинен, но он на чужой странице
    if ((auth_store.isAuth && auth_store.user.username !== username) || (!auth_store.isAuth)) {
        return (
            <>
                <section className='game-page-section'>
                    {user_store.userActivity.length > 0 ?
                        <>
                            {user_store.userActivity.map((game) => <>{game.activity_type == 'liked' ?
                                <Link key={game.id} to={'/game/' + game.slug}>
                                    <div className="profile-card-cover-container">
                                        <img src={game.cover} />
                                        <div className="title-card-body-profile">
                                            <div className="title-card">
                                                <span className="card-title">{game.title}</span>

                                            </div>
                                            <div className="title-card-activity">

                                                <span className="card-title-activity">

                                                    <FormattedMessage id="content.userprofile.liked" />
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                </Link> : null}</>)}
                        </> : null
                    }
                </section>
            </>
        )
    }

    return (
        <>
            <section className='game-page-section'>
                {auth_store.userActivity.length > 0 ?
                    <>
                        {auth_store.userActivity.map((game) => <>{game.activity_type == 'liked' ?
                            <Link key={game.id} to={'/game/' + game.slug}>
                                <div className="profile-card-cover-container">
                                    <img src={game.cover} />
                                    <div className="title-card-body-profile">
                                        <div className="title-card">
                                            <span className="card-title">{game.title}</span>

                                        </div>
                                        <div className="title-card-activity">

                                            <span className="card-title-activity">

                                                <FormattedMessage id="content.userprofile.liked" />
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </Link> : null}</>)}
                    </> : null
                }
            </section>
        </>
    )
}


export default observer(LikedGamesPage);