import { FC, SyntheticEvent, useContext, useEffect, useState } from 'react'
import GameService from '../service/GameService';
import { Link, useSearchParams } from 'react-router-dom';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { Pagination } from '../components/Pagination';


const GamesPage: FC = () => {
  const { games_store } = useContext(Context);
  const [searchParams, setSearchParams] = useSearchParams();
  const myParam = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState<number>(Number(myParam));

  useEffect(() => {
    if (games_store.genre !== "null") {
      games_store.getPageCount(null, null, games_store.genre)
    }
    else {
      games_store.getPageCount(null, null, null)
    }

  }, [])


  const handlePageClick = async (event: { selected: number; }) => {
    setCurrentPage(currentPage)
    if (games_store.sort !== "null") {
      if (games_store.genre === "null") {
        setSearchParams({ page: String(event.selected + 1), sort: games_store.sort });
        const response = await GameService.getGamesPages(event.selected + 1, games_store.sort, null, null)
        games_store.setGamesPage(response.data)
      }
      if (games_store.genre !== "null") {
        setSearchParams({ page: String(currentPage), sort: games_store.sort, genre: games_store.genre });
        const response = await GameService.getGamesPages(event.selected + 1, games_store.sort, null, games_store.genre)
        games_store.setGamesPage(response.data)
      }
    }

    if (games_store.sort === "null") {
      if (games_store.genre === "null") {
        setSearchParams({ page: String(currentPage) });
        const response = await GameService.getGamesPages(event.selected + 1, null, null, null)
        games_store.setGamesPage(response.data)
      }
      if (games_store.genre !== "null") {
        setSearchParams({ page: String(currentPage), genre: games_store.genre });
        const response = await GameService.getGamesPages(event.selected + 1, null, null, games_store.genre)
        games_store.setGamesPage(response.data)
      }
    }

    setCurrentPage(event.selected + 1)

  };

  const setFilter = async (event: SyntheticEvent) => {
    const sort = event.currentTarget.id
    if (sort === 'alphabetic') {
      games_store.setSort(sort)
      if (games_store.genre === "null") {
        const response = await GameService.getGamesPages(1, sort, null, null)
        games_store.setGamesPage(response.data)
        setSearchParams({ page: String(currentPage), sort: "alphabetic" });
      }
      if (games_store.genre !== "null") {
        games_store.setSort(sort)
        const response = await GameService.getGamesPages(1, sort, null, games_store.genre)
        games_store.setGamesPage(response.data)
        setSearchParams({ page: String(currentPage), sort: "alphabetic", genre: games_store.genre });
      }
    }

    if (sort === 'alphabeticdesc') {
      if (games_store.genre === "null") {
        games_store.setSort(sort)
        const response = await GameService.getGamesPages(1, sort, null, null)
        games_store.setGamesPage(response.data)
        setSearchParams({ page: String(currentPage), sort: "alphabeticdesc" });
      }
      if (games_store.genre !== "null") {
        games_store.setSort(sort)
        const response = await GameService.getGamesPages(1, sort, null, games_store.genre)
        games_store.setGamesPage(response.data)
        setSearchParams({ page: String(currentPage), sort: "alphabeticdesc", genre: games_store.genre });
      }
    }

    if (sort === 'release') {
      if (games_store.genre === "null") {
        games_store.setSort(sort)
        const response = await GameService.getGamesPages(1, sort, null, null)
        games_store.setGamesPage(response.data)
        setSearchParams({ page: String(currentPage), sort: "release" });
      }
      if (games_store.genre !== "null") {
        games_store.setSort(sort)
        const response = await GameService.getGamesPages(1, sort, null, games_store.genre)
        games_store.setGamesPage(response.data)
        setSearchParams({ page: String(currentPage), sort: "release", genre: games_store.genre });
      }
    }

    if (sort === 'releasedesc') {
      if (games_store.genre === "null") {
        games_store.setSort(sort)
        const response = await GameService.getGamesPages(1, sort, null, null)
        games_store.setGamesPage(response.data)
        setSearchParams({ page: String(currentPage), sort: "releasedesc" });
      }

      if (games_store.genre !== "null") {
        games_store.setSort(sort)
        const response = await GameService.getGamesPages(1, sort, null, games_store.genre)
        games_store.setGamesPage(response.data)
        setSearchParams({ page: String(currentPage), sort: "releasedesc", genre: games_store.genre });
      }
    }
  }

  const setGenreFilter = async (e: SyntheticEvent) => {
    const genre = e.currentTarget.id
    games_store.setGenre(genre)

    if (games_store.sort === 'null') {
      setSearchParams({ page: String(1), genre: genre });
      games_store.getPageCount(null, null, games_store.genre)
      const response = await GameService.getGamesPages(1, games_store.sort, null, genre)
      setCurrentPage(1)
      games_store.setGamesPage(response.data)
    }

    if (games_store.sort !== 'null') {
      const response = await GameService.getGamesPages(1, String(games_store.sort), null, genre)
      setCurrentPage(1)
      games_store.setGamesPage(response.data)
      games_store.getPageCount(null, null, games_store.genre)
      setSearchParams({ page: String(1), sort: games_store.sort, genre: genre });
    }
  }

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
      <section className='game-page-section'>

        <div className="sort-filter-containers">
          <div className="dropdown-genre">
            <button className="dropbtn-genre">
              Жанр
            </button>

            <div className="dropdown-content">
              <hr className='drop-down-line' />
              <li id='Action' onClick={setGenreFilter}>Action</li>
              <li id='Shooter' onClick={setGenreFilter}>Шутер</li>
              <li id='RPG' onClick={setGenreFilter}>РПГ</li>
              <li id='Puzzle' onClick={setGenreFilter}>Пазл</li>

            </div>
          </div>

          <div className="dropdown-filter">
            <button className="dropbtn-filter">
              Сортировать
            </button>

            <div className="dropdown-content">
              <hr className='drop-down-line' />
              <span className='dropdown-title'>По алфавиту</span>
              <li id='alphabetic' onClick={setFilter}>А-Я</li>
              <li id='alphabeticdesc' onClick={setFilter}>Я-А</li>
              <span className='dropdown-title'>По дате</span>
              <li id='release' onClick={setFilter}>Сначала старые</li>
              <li id='releasedesc' onClick={setFilter}>Сначала новые</li>
            </div>
          </div>
        </div>
        <div className="card-with-games-container">

          {games_store.gamesPage.map(game =>
            <Link key={game.id} to={'/game/' + game.slug} >
              <div className="game-card-cover-container">
                {game.cover != null ? <img src={game.cover} alt='' width="50" height="50" /> : <img src={require('../icons/img-not-found.png')} alt='' width="150" height="150" />}
                <div className="title-card-body">
                  <div className="title-card">
                    <span className="card-title">{game.title}</span>
                  </div>
                </div>
              </div>
            </Link>)}
        </div>


        <Pagination initialPage={currentPage - 1}
          pageCount={Math.ceil(games_store.pageCount)}
          onChange={handlePageClick} />

      </section >
    </>
  )
}

export default observer(GamesPage);