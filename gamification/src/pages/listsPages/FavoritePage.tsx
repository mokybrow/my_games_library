import React, { useContext, useEffect } from 'react'
import { Context } from '../..';
import { Link, useParams } from 'react-router-dom';
import GameCard from '../../components/gamecard/game-card';
import '../../styles/game-in-lists.css'
import { observer } from 'mobx-react-lite';

const FavoritePage = () => {
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
                user_store.findUser(String(username), 0, null)
            }
            else {
                user_store.getMyProfileFunc(auth_store.user.id, 0, null)
            }
        })

    }, [])

    if (user_store.isLoading) {
        return (
            <section className='games-lists-section'>
                Loading..
            </section>
        )
    }
    return (
        <section className='games-lists-section'>
            <div className='game-in-lists-grid-container'>
                {user_store.userActivity.length > 0 ?
                    <>
                        {user_store.userActivity.map((game) =>
                            <>
                                {game.activity_type == 'liked' ?
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

export default observer(FavoritePage);