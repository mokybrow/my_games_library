import React, { useContext, useEffect } from 'react'
import '../styles/all-lists-page.css'
import ListPageSortSelect from '../components/filterselect/listspage-sort';
import { Context } from '..';
import { useSearchParams } from 'react-router-dom';
import ListsPagePagination from '../components/pagination/listspage-pagination';
import ListPageCard  from '../components/listscard/list-card';
import { observer } from 'mobx-react-lite';

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



  return (

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
  )
}

export default observer(AllListsPage);