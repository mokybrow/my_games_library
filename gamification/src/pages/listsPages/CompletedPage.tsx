import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Context } from '../..';
import '../../styles/game-in-lists.css'
import { observer } from 'mobx-react-lite';
import GameCard from '../../components/gamecard/game-card';
import Loader from '../../components/loader/loader';
import { Helmet } from "react-helmet-async";

const CompletedPage = () => {
    const { auth_store } = useContext(Context);
    const { user_store } = useContext(Context);
    const { username } = useParams<string>();
    // const { username } = useParams<{username?: string}>();
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
                <title>Пройденные игры {username}</title>
                <link rel="canonical" href={'https://dudesplay.ru/' + username + '/completed'} />
                <meta name="title" content='Пройденные игры' />
                <meta name="description" content={'Пройденные игры пользователя' + username} />
                <meta property="og:site_name" content='Чуваки' />
                <meta property="og:title" content='Пройденные игры' />
                <meta property="og:description" content={'Пройденные игры пользователя' + username} />

            </Helmet>
            <section className='games-lists-section'>
                <div className='game-in-lists-grid-container'>
                    {user_store.userActivity.length > 0 ?
                        <>
                            {user_store.userActivity.map((game) =>
                                <>
                                    {game.activity_type == 'passed' ?
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

export default observer(CompletedPage);