import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Context } from '../..';
import '../../styles/game-in-lists.css'
import { observer } from 'mobx-react-lite';
import GameCard from '../../components/gamecard/game-card';

const CompletedPage = () => {
    const { auth_store } = useContext(Context);
    const { user_store } = useContext(Context);
    const { username } = useParams<string>();
    // const { username } = useParams<{username?: string}>();
    useEffect(() => {

        if (auth_store.user.username !== undefined) {
            if (auth_store.user.username.toLowerCase() !== String(username).toLowerCase()) {
                user_store.findUser(String(username), 0, null)
            }
            else {
                user_store.getMyProfileFunc(auth_store.user.id, 0, null)
            }
        }

    }, [auth_store.user.username])

    return (
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
    )
}

export default observer(CompletedPage);