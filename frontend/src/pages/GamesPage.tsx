import React, { useEffect, useState } from 'react'
import GameService from '../service/GameService';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { GamesCountResponse, GamesResponse } from '../models/response';
import { FormattedMessage } from 'react-intl';
import ReactPaginate from 'react-paginate';
import { Paginator } from '../components/Paginator';

export const GamesPage = () => {
  const { id } = useParams<string>();
  const [games, setGames] = useState<GamesResponse[]>([]);


  const getGames = async () => {

    try {
      const response = await GameService.getGames(Number(id));
      const gameCount = await GameService.getGamesCount();
      setGames(response.data)
      const currentPath = window.location.pathname;
    } catch (error) {

    }
  }

  useEffect(() => {
    getGames();
  }, [])


  return (
    <>
      <section className='game-page-section'>

        {games.map(game =>
          <Link key={game.id} to={'/game/' + game.slug} reloadDocument>
            <div className="game-card-cover-container">
              <img src={game.cover} />
              <div className="title-card-body">
                <div className="title-card">
                  <span className="card-title">{game.title}</span>
                </div>
              </div>
            </div>
          </Link>)}
      </section>
    </>
  )
}

