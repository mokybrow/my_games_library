import React, { FC, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import ListService from '../service/ListService';

const ListPage: FC = () => {
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
        <h1>Добавить список в коллекцию</h1>

        <div className="checkbox-card-body-lists">
          <div className="checkbox">
            <input onClick={addListToMyProfile} className="custom-checkbox heart" type="checkbox" id="color-2" name="color-2" value="red" onChange={() => list_store.setAddedList(!list_store.addedList)} checked={list_store.addedList} />
            <label htmlFor="color-2"></label>
          </div>

        </div>
      </div>
      {list_store.ListsGames.length > 0 ? <>{list_store.ListsGames.map(list =>
        <Link key={list.game_id} to={'/game/' + list.slug} >
          <div className="game-card-cover-container">
            {list.cover != null ? <img src={`data:image/jpeg;base64,${list.cover}`} alt='' width="50" height="50" /> : <img src={require('../icons/img-not-found.png')} alt='' width="150" height="150" />}
            <div className="title-card-body">
              <div className="title-card">
                <span className="card-title">{list.title}</span>
              </div>
            </div>
          </div>
        </Link>)}</> :
        <div className="error-card-container">
          Пользователь не добавил в этот список игр
        </div>}



    </section>
  )
}

export default observer(ListPage);