import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react'
import { GamesResponse } from '../models/response';
import GameService from '../service/GameService';
import { Link } from 'react-router-dom';
import { Context } from '..';

const HomePage: FC = () => {

  const { games_store } = useContext(Context);

  useEffect(() => {
    games_store.getNewstGame()
  }, [])


  if (games_store.isLoading === true) {
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
    <>
      <section className='home-page-game-section'>
        <div className='header-new-game'>
          <Link className='header-new-game' to='/games/new' ><h1 >Новинки</h1></Link>
        </div>
        {games_store.games.map(game =>
          <Link key={game.id} to={'game/' + game.slug}>
            <div className="card">
              <div className="card__image-container">
                
                <img
                  src={game.cover}
                />
                <div className="card-body">
                  <p className="card-title">{game.title}</p>
                </div>
              </div>
            </div></Link>)}
      </section>
    </>
  )
}


export default observer(HomePage);