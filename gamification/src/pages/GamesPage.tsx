import React, { useContext, useEffect } from 'react'
import '../styles/games-page.css'
import { Context } from '..';
import GameCard from '../components/gamecard/game-card';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../components/pagination/pagination';

const GamesPage = () => {
  const { games_store } = useContext(Context);
  const pageLimitElement = 36
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page');


  useEffect(() => {
    if (pageParam === null) {
      games_store.getGameByPage(1, pageLimitElement, null, null, null)
    }
    else {
      games_store.getGameByPage(Number(pageParam), pageLimitElement, null, null, null)
    }
    games_store.getPageCount(pageLimitElement, null)
  }, [games_store])

  if (games_store.isLoading === true) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <section className='games-page-section'>
      <div className='main-page-grid-container'>
        <div className="new-games-grid-container">
          {games_store.gamesPage.map((game) =>
            <GameCard
              gameId={game.id}
              gameSlug={game.slug}
              gameCover={game.cover}
              gameTitle={game.title}
              activityType={''} />)}
        </div>
      </div>
      <Pagination currentPage={pageParam !== null ? Number(pageParam) : 1} 
      pageCount={Math.ceil(games_store.pageCount / pageLimitElement)} />
    </section>
  )
}

export default observer(GamesPage);
