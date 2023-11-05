import React, { useContext, useEffect } from 'react'
import { Context } from '../..';
import { useParams } from 'react-router-dom';
import GameCard from '../../components/gamecard/game-card';
import { observer } from 'mobx-react-lite';

const GameInLists = () => {
    const { auth_store } = useContext(Context);

    const { slug } = useParams<string>();
    const { list_store } = useContext(Context);
    useEffect(() => {
        list_store.getListPageGames(String(slug))
    }, [])
    const addListToMyProfile = () => {
        list_store.addDeleteList(String(slug))
    }
    return (
        <section className='games-lists-section'>
            <div className='game-in-lists-grid-container'>
                <div className="user-list-info">
                    <h1>{list_store.listData.title}</h1>
                    <p>Игр в списке {list_store.ListsGames.length > 0 ? list_store.ListsGames.length : 0}</p>
                    {/* {list_store.listData.owner_id === auth_store.user.id ?
                        null :
                        <div className="add-to-list-wrap">
                            <p>Добавить список в коллекцию</p>
                            <input onClick={addListToMyProfile} className="custom-checkbox-comment like" type="checkbox" id="add" name="add"
                                onChange={() => list_store.setAddedList(!list_store.addedList)}
                                defaultChecked={list_store.addedList} />
                            <label htmlFor="add"></label>

                        </div>} */}

                </div>
                {list_store.ListsGames.length > 0 ?
                    <>
                        {list_store.ListsGames.map(game =>
                            <div key={game.game_id}>
                                <GameCard
                                    gameId={game.game_id}
                                    gameSlug={game.slug}
                                    gameCover={game.cover}
                                    gameTitle={game.title}
                                    activityType={''} />
                            </div>
                        )}
                    </> : null
                }

            </div>
        </section>
    )
}

export default observer(GameInLists);