import React, { useContext, useEffect } from 'react'
import '../styles/all-lists-page.css'
import ListPageSortSelect from '../components/filterselect/listspage-sort';
import { Context } from '..';
import { useSearchParams } from 'react-router-dom';
import ListsPagePagination from '../components/pagination/listspage-pagination';
import ListPageCard from '../components/listscard/list-card';
import { observer } from 'mobx-react-lite';
import Loader from '../components/loader/loader';
import { Helmet } from "react-helmet-async";

const AllListsPage = () => {
  const { list_store } = useContext(Context);
  const pageLimitElement = 24
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const sortParam = searchParams.get('sort');
  const filterParam = searchParams.get('filter');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (pageParam === null) {
      list_store.getAllLists(1, pageLimitElement, sortParam,)
    }
    else {
      list_store.getAllLists(Number(pageParam), pageLimitElement, sortParam)
    }
  }, [list_store])

  if (list_store.isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Списки</title>
        <link rel="canonical" href={'https://dudesplay.ru/lists'} />
        <meta name="title" content='Чуваки' />
        <meta name="description" content='Смотри во что играют другие чуваки' />
        <meta property="og:site_name" content='Чуваки' />
        <meta property="og:title" content='Чуваки' />
        <meta property="og:description" content='Смотри во что играют другие чуваки' />
      </Helmet>
      <section className='all-lists-page-section'>
        <div className='all-lists-page-grid'>
          <div className="filters-container">
            <ListPageSortSelect />
          </div>
          {list_store.allLists.length > 0 ?
            <>
              {list_store.allLists.map((list) =>
                <div key={list.id}>
                  <ListPageCard
                    listId={list.id}
                    listSlug={list.slug}
                    listCover={list.cover}
                    listTitle={list.title} />
                </div>
              )}
            </>
            : null}

          <ListsPagePagination currentPage={pageParam !== null ? Number(pageParam) : 1}
            pageCount={Math.ceil(list_store.pageCount / pageLimitElement)} />
        </div>
      </section>
    </>
  )
}

export default observer(AllListsPage);