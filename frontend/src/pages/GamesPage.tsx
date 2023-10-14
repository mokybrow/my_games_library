import { FC, SyntheticEvent, useContext, useEffect, useState } from 'react'
import GameService from '../service/GameService';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Pagination } from '../components/Pagination';
import { Context } from '..';
import { observer } from 'mobx-react-lite';


const GamesPage: FC = () => {

  const { games_store } = useContext(Context);
  const pageNumber = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(Number(pageNumber.pathname.split('/')[3]))
  let navigate = useNavigate();

  useEffect(() => {
    console.log(currentPage)
    games_store.currentPage = currentPage
    games_store.getGameByPage(games_store.currentPage, games_store.sort, null, null)
    games_store.getPageCount()
  }, [])


  const handleClickPage = async ({ selected }: any) => {
    setCurrentPage(selected + 1)
    navigate(`/games/page/${selected + 1}`, { replace: true })
    const response = await GameService.getGamesPages(selected + 1, games_store.sort, null, null)
    games_store.setGamesPage(response.data)
    setCurrentPage(selected + 1)
  }


  const setFilterAlphabet = async () => {
    games_store.setSort('alphabet')
    const response = await GameService.getGamesPages(currentPage, games_store.sort, null, null)
    games_store.setGamesPage(response.data)
  }

  const setFilterRelease = async () => {
    games_store.setSort('release')
    const response = await GameService.getGamesPages(currentPage, games_store.sort, null, null)
    games_store.setGamesPage(response.data)
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
        <div className='main-grid-container'>

          <div className="dropdown-filter">
            <button className="dropbtn-filter">
              Сортировать
            </button>

            <div className="dropdown-content">
              <hr className='drop-down-line' />
              <li id='alphabet' onClick={setFilterAlphabet}>По алфавиту</li>
              <li id='release' onClick={setFilterRelease}>По дате</li>


            </div>
          </div>

          <div className="card-with-games-container">

            {games_store.gamesPage.map(game =>
              <Link key={game.id} to={'/game/' + game.slug} reloadDocument>
                <div className="game-card-cover-container">
                  {game.cover != null ? <img src={game.cover} alt='' /> : <img src={require('../icons/img-not-found.png')} alt='' />}
                  <div className="title-card-body">
                    <div className="title-card">
                      <span className="card-title">{game.title}</span>
                    </div>
                  </div>
                </div>
              </Link>)}
          </div>
          <Pagination initialPage={currentPage - 1} pageCount={Math.ceil(games_store.pageCount)} onChange={handleClickPage} marginPagesDisplayed={3} pageRangeDisplayed={7} />
        </div>
      </section >
    </>
  )
}

export default observer(GamesPage);