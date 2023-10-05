import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react'
import { GamesResponse } from '../models/response';
import GameService from '../service/GameService';
import { Link } from 'react-router-dom';

const HomePage: FC = () => {
  const [games, setGames] = useState<GamesResponse[]>([]);
  const getGames = async () => {
    try {
      const response = await GameService.getNewGames();
      setGames(response.data)
    } catch (error) {

    }
  }
  useEffect(() => {
    getGames();
  }, [])
  return (
    <>
      <section className='home-page-game-section'>
        <div className='header-new-game'>
          <Link className='header-new-game' to='/games/new' ><h1 >Новинки</h1></Link>
        </div>
        {games.map(game =>
          <Link key={game.id} to={'game/' + game.slug}>
            <div   className="card">
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