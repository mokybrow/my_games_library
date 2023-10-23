import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react'
import { Context } from '..';
import { Pagination } from '../components/Pagination';
import { useSearchParams } from 'react-router-dom';
import { ArticleCard } from '../components/ArticleCard';
import '../styles/articles-page.css'

const ArticlesPage: FC = () => {
  const { artilce_store } = useContext(Context);

  const [searchParams, setSearchParams] = useSearchParams();
  const myParam = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState<number>(Number(myParam));

  useEffect(() => {

    artilce_store.getAllArticleFunc(currentPage - 1, 36, false, null)
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
      <section className='articles-section'>
        <div className='articles-grid-container'>


          {<>{artilce_store.articles.map(article =>
            <div key={article.id} className="article-page-artilce-card-container" style={{ gridColumnEnd: `span 2` }}>
              <ArticleCard

                src={`data:image/jpeg;base64,${article.cover}`}
                title={article.title}
                username={article.username}
                comment={article.text}
                img={`data:image/jpeg;base64,${article.img}`}
                like_count={article.like_count}
                slug={article.slug}
                columnSpan={3}
                created_at={article.created_at}
                article_id={article.id}
                authorLike={article.hasAuthorLike}
                offset={0}
                limit={4}
                popular={null}
                date={true} />
            </div>

          )}</>}
          <Pagination initialPage={currentPage - 1}
            pageCount={Math.ceil(artilce_store.pageCount)}
            onChange={handlePageClick} />
        </div>


      </section>
    </>
  )
}

export default observer(ArticlesPage);
