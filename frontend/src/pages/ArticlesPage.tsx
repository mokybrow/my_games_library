import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react'
import { Context } from '..';
import { Pagination } from '../components/Pagination';
import { useSearchParams } from 'react-router-dom';
import { ArticleCard } from '../components/ArticleCard';
import '../styles/articles-page.css'
import ArticleService from '../service/ArticleService';
import { getLocalToken } from '../utils/utils';
import AuthService from '../service/AuthService';

const ArticlesPage: FC = () => {
  const { artilce_store } = useContext(Context);
  const { auth_store } = useContext(Context);

  const [searchParams, setSearchParams] = useSearchParams();
  const myParam = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState<number>(Number(myParam));
  const pageLimitElement = 2

  useEffect(() => {
    artilce_store.getAllArticleFunc(1, pageLimitElement, false, null)
  }, [artilce_store])


  const handlePageClick = async (event: { selected: number; }) => {
    setCurrentPage(currentPage)
    setSearchParams({ page: String(event.selected + 1) });
    await artilce_store.getAllArticlePageCountFunc(pageLimitElement);
    try {
      if (getLocalToken()) {
        console.log(true)
        const response = await ArticleService.getAllArticles(event.selected + 1, pageLimitElement, false, false, auth_store.user.id);
        artilce_store.setArticles(response.data)
      } else {
        const response = await ArticleService.getAllArticles(event.selected + 1, pageLimitElement, false, false, null);
        artilce_store.setArticles(response.data)
      }
    } catch (error) {

    }
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
      <section className='articles-page-game-section'>
        <div className="articles-page-grid-container">


          {<>{artilce_store.articles.map(article =>
            <div key={article.id} className="article-card-container">
              <ArticleCard
                src={`data:image/jpeg;base64,${article.cover}`}
                title={article.title}
                username={article.username}
                comment={article.text}
                img={article.img}
                like_count={article.like_count}
                slug={article.slug}
                created_at={article.created_at}
                article_id={article.id}
                authorLike={article.hasAuthorLike}
                offset={currentPage}
                limit={pageLimitElement}
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
