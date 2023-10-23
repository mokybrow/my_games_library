import { observer } from 'mobx-react-lite'
import React, { FC, useContext, useEffect, useState } from 'react'
import { Context } from '..';
import { Link, useSearchParams } from 'react-router-dom';
import { ImageCard } from '../components/ImageCard';
import { Pagination } from '../components/Pagination';

const PlaylistsPage: FC = () => {
  const { list_store } = useContext(Context);

  const [searchParams, setSearchParams] = useSearchParams();
  const myParam = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState<number>(Number(myParam));

  useEffect(() => {

    list_store.getAllLists()

  }, [])

  const handlePageClick = async (event: { selected: number; }) => {
    setCurrentPage(currentPage)
    setSearchParams({ page: String(event.selected + 1) });
    setCurrentPage(event.selected + 1)
  };


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
    <section className='playlist-section'>
      <div className='plalist-grid-container'>
        {list_store.allLists.length > 0 ? <>{list_store.allLists.map(list =>
          <Link key={list.id} to={'/list/' + list.slug} >

            <ImageCard src={list.cover != null ? `data:image/jpeg;base64,${list.cover}` : require("../icons/img-not-found.png")} title={String(list.title)} />
          </Link>)}</> :
          <div className="error-card-container">
            Пользователи не создали ни одного списка
          </div>}

          <Pagination initialPage={currentPage - 1}
          pageCount={Math.ceil(list_store.pageCount)}
          onChange={handlePageClick} />
      </div>


    </section>
  )
}

export default observer(PlaylistsPage);