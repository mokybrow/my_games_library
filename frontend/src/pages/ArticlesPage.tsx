import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react'
import { Context } from '..';
import { MediumImageCard } from '../components/MediumImageCard';
import { Pagination } from '../components/Pagination';
import { useSearchParams } from 'react-router-dom';
import { ArticleCard } from '../components/ArticleCard';

const ArticlesPage: FC = () => {
  const { artilce_store } = useContext(Context);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const myParam = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState<number>(Number(myParam));

  useEffect(() => {

    artilce_store.getAllArticleFunc(currentPage - 1, 36, false, null)
    console.log(myParam)
  }, [artilce_store])

  const handlePageClick = async (event: { selected: number; }) => {
    setCurrentPage(currentPage)
    setSearchParams({ page: String(event.selected + 1) });
    setCurrentPage(event.selected + 1)
  };

  if (artilce_store.isLoading === true) {
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
      <section className='playlist-section'>
        <div className='plalist-grid-container'>
          
          { <>{artilce_store.articles.map(article =>
            <>
              <ArticleCard 
              key={article.id} 
              src={article.cover} 
              title={article.title} 
              username={article.username} 
              comment={article.text} 
              img={article.img} 
              grade={article.like_count} 
              slug={article.slug} 
              columnSpan={3} 
              created_at={article.created_at} />

            </>
          )}</> }
        </div>

        <Pagination initialPage={currentPage - 1}
          pageCount={Math.ceil(artilce_store.pageCount)}
          onChange={handlePageClick} />
      </section>
    </>
  )
}

export default observer(ArticlesPage);
