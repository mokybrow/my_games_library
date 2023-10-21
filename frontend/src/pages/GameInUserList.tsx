import React, { FC, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import ListService from '../service/ListService';
import { ImageCard } from '../components/ImageCard';

const GameInUserList: FC = () => {
  const { auth_store } = useContext(Context);

  const { slug } = useParams<string>();
  const { list_store } = useContext(Context);

  useEffect(() => {
    list_store.getListPageGames(String(slug))
  }, [])

  const addListToMyProfile = () => {
    console.log('fdsfkkdj')
    list_store.addDeleteList(String(slug))
  }

  if (list_store.isLoading === true) {
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
    <section className='other-page-section'>
      <div className="list-banner-container">
        {list_store.listData.owner_id == auth_store.user.id ? <><h1>{list_store.listData.title}</h1> </> :
          <>
            <h1>Добавить список в коллекцию</h1>

            <div className="checkbox-card-body-lists">
              <div className="checkbox">
                <input onClick={addListToMyProfile} className="custom-checkbox heart" type="checkbox" id="color-2" name="color-2" value="red" onChange={() => list_store.setAddedList(!list_store.addedList)} checked={list_store.addedList} />
                <label htmlFor="color-2"></label>
              </div>

            </div></>}

      </div>
      {list_store.ListsGames.length > 0 ? <>{list_store.ListsGames.map(game =>
        <Link key={game.game_id} to={'/game/' + game.slug} >

          <ImageCard src={game.cover != null ? game.cover : '../icons/img-not-found.png'} title={String(game.title)} />

        </Link>)}</> :
        <div className="error-card-container">
          Пользователь не добавил в этот список игр
        </div>}



    </section>
  )
}

export default observer(GameInUserList);