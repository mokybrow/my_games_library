import React, { useContext, useEffect } from 'react'
import { Context } from '../..';
import { useParams } from 'react-router-dom';
import GameCard from '../../components/gamecard/game-card';
import '../../styles/game-in-lists.css'
import { observer } from 'mobx-react-lite';
import Loader from '../../components/loader/loader';
import { Helmet } from 'react-helmet';

const WishlistPage = () => {

    const { auth_store } = useContext(Context);
    const { user_store } = useContext(Context);
    const { username } = useParams<string>();

    useEffect(() => {
        window.scrollTo(0, 0);

        if (auth_store.user.username !== undefined) {
            if (auth_store.user.username.toLowerCase() !== String(username).toLowerCase()) {
                user_store.findUser(String(username), 0, null)
            }
            else {
                user_store.getMyProfileFunc(auth_store.user.id, 0, null)
            }
        }

    }, [auth_store.user.username])

    if (user_store.isLoading) {
        return (
            <Loader />
        )
    }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Игры, которые {username} пройдёт</title>
                <link rel="canonical" href={'https://dudesplay.ru/' + username + '/wishlist'} />
                <meta name="title" content='Игры, которые пользователь пройдёт' />
                <meta name="description" content={'Игры, которые' + username +'пользователь пройдёт'}/>
                <meta property="og:site_name" content='Чуваки' />
                <meta property="og:title" content='Игры, которые пользователь пройдёт' />
                <meta property="og:description" content={'Игры, которые' + username +'пользователь пройдёт'} />

            </Helmet>
            <section className='games-lists-section'>
                <div className='game-in-lists-grid-container'>
                    {user_store.userActivity.length > 0 ?
                        <>
                            {user_store.userActivity.map((game) =>
                                <>
                                    {game.activity_type === 'wanted' ?
                                        <div key={game.id}>
                                            <GameCard
                                                gameId={game.id}
                                                gameSlug={game.slug}
                                                gameCover={game.cover}
                                                gameTitle={game.title}
                                                activityType={game.activity_type} />
                                        </div>
                                        : null}
                                </>)}
                        </> : null
                    }
                </div>
            </section>
        </>
    )
}

export default observer(WishlistPage);