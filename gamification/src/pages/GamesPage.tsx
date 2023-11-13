import React, { FC, useContext, useEffect, useState } from 'react'
import '../styles/games-page.css'
import { Context } from '..';
import GameCard from '../components/gamecard/game-card';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../components/pagination/pagination';
import FilterSelect from '../components/filterselect/filter-select';
import SortSelect from '../components/filterselect/sort-select';
import Loader from '../components/loader/loader';
import { Helmet } from "react-helmet-async";


const GamesPage: FC = () => {
  const { games_store } = useContext(Context);
  const pageLimitElement = 24
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const sortParam = searchParams.get('sort');
  const filterParam = searchParams.get('filter');


  useEffect(() => {
    window.scrollTo(0, 0);
    if (pageParam === null) {
      games_store.getGameByPage(1, pageLimitElement, sortParam, null, filterParam)
    }
    else {
      games_store.getGameByPage(Number(pageParam), pageLimitElement, sortParam, null, filterParam)
    }
  }, [games_store])

  if (games_store.isLoading) {
    return (
      <Loader />
    )
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Игры</title>
        <link rel="canonical" href={'https://dudesplay.ru/games'} />
        <meta name="title" content='Чуваки' />
        <meta name="description" content='Исследуй мир видеоигр' />
        <meta property="og:site_name" content='Чуваки' />
        <meta property="og:title" content='Чуваки' />
        <meta property="og:description" content='Исследуй мир видеоигр' />
      </Helmet>
      <section className='games-page-section'>
        <div className='games-page-grid-container'>
          <div className="filters-container">
            <FilterSelect />
            <SortSelect />
          </div>
          <div className="games-grid-container">
            {games_store.gamesPage.map((game) =>
              <div key={game.id}>
                <GameCard
                  gameId={game.id}
                  gameSlug={game.slug}
                  gameCover={game.cover}
                  gameTitle={game.title}
                  activityType={''} />
              </div>)}

          </div>
          <Pagination currentPage={pageParam !== null ? Number(pageParam) : 1}
            pageCount={Math.ceil(games_store.pageCount / pageLimitElement)} />
        </div>

      </section>
    </>
  )
}

export default observer(GamesPage);
