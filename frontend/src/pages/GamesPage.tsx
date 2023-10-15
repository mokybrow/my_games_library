import { FC, SyntheticEvent, useContext, useEffect, useState } from 'react'
import GameService from '../service/GameService';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import ReactPaginate from 'react-paginate';
import { Pagination } from '../components/Pagination';


const GamesPage: FC = () => {
  const { games_store } = useContext(Context);
  const [searchParams, setSearchParams] = useSearchParams();
  const myParam = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState<number>(Number(myParam));
  const navigate = useNavigate();

  useEffect(() => {
    games_store.getPageCount()
  }, [])


  const handlePageClick = async (event: { selected: number; }) => {
    if (games_store.sort == 'null') {
      setSearchParams({ page: String(event.selected + 1) });
    }
    if (games_store.sort !== 'null') {
      navigate(`?page=${currentPage}&sort=${games_store.sort}`)
    }
    setCurrentPage(event.selected + 1)
    console.log('Я сработала')
    const response = await GameService.getGamesPages(event.selected + 1, games_store.sort, null, null)
    games_store.setGamesPage(response.data)
    console.log(
      `User requested page number ${event.selected}`
    );
  };

  const setFilter = (event: SyntheticEvent) => {
    console.log(event.currentTarget.id);
    const sort = event.currentTarget.id
    if (sort === 'alphabetic') {
      console.log('запрос по алфавиту')
      games_store.setSort('alphabetic')
      navigate(`?page=${currentPage}&sort=alphabetic`)
    }
    if (sort === 'release') {
      console.log('запрос по дате')
      games_store.setSort('release')
      navigate(`?page=${currentPage}&sort=release`)
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
        <div className='main-grid-container'>

          <div className="dropdown-filter">
            <button className="dropbtn-filter">
              Сортировать
            </button>

            <div className="dropdown-content">
              <hr className='drop-down-line' />
              <li id='alphabetic' onClick={setFilter}>По алфавиту</li>
              <li id='release' onClick={setFilter}>По дате</li>
            </div>
          </div>

          <div className="card-with-games-container">

            {games_store.gamesPage.map(game =>
              <Link key={game.id} to={'/game/' + game.slug} >
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
{/* 
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            initialPage={currentPage - 1}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={Math.ceil(games_store.pageCount)}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName={'pagination'}
            activeClassName={'active'}
            className='pagination-container'
          /> */}

          <Pagination initialPage={currentPage-1} 
          pageCount={Math.ceil(games_store.pageCount)} 
          onChange={handlePageClick} />


        </div>
      </section >
    </>
  )
}

export default observer(GamesPage);