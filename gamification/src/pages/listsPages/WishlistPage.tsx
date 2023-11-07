import React, { useContext, useEffect } from 'react'
import { Context } from '../..';
import { useParams } from 'react-router-dom';
import GameCard from '../../components/gamecard/game-card';
import '../../styles/game-in-lists.css'
import { observer } from 'mobx-react-lite';

const WishlistPage = () => {

    const { auth_store } = useContext(Context);
    const { user_store } = useContext(Context);
    const { username } = useParams<string>();

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

    if (user_store.isLoading || auth_store.isLoading) {
        return (
            <div className='loading-page'>
                <img src={require('../../assets/img/dude.jpeg')} alt="Dude" />
            </div>
        )
    }
    return (
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
    )
}

export default observer(WishlistPage);