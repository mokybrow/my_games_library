import { useContext, useEffect, useRef, useState } from 'react';
import '../styles/main-page.css'
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import GameCard from '../components/gamecard/game-card';
import NewsCard from '../components/newscard/news-card';
import { ReviewCard } from '../components/reviewcard/review-card';
import { MainPageReviewCard } from '../components/reviewcard/main-page-review';
import { InfoBanner } from '../components/infobanner/info-banner';
import { Link } from 'react-router-dom';
import Loader from '../components/loader/loader';
import { Helmet } from 'react-helmet';
import { MouseParallax, ScrollParallax, ScrollParallaxHandle } from "react-just-parallax";


const MainPage = () => {
  const { games_store } = useContext(Context);
  const { artilce_store } = useContext(Context);
  const { review_store } = useContext(Context);



  useEffect(() => {
    window.scrollTo(0, 0);
    games_store.getNewstGame()
    artilce_store.getAllArticleFunc(1, 4, 'new', 'news')
    review_store.getReviewsFunc(0, 4, true, null)

  }, [])

  if (artilce_store.isLoading || games_store.isLoading || review_store.isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Чуваки</title>
        <link rel="canonical" href={'https://dudesplay.ru/'} />
        <meta name="title" content='Чуваки' />
        <meta property="og:site_name" content='Чуваки' />
        <meta property="og:title" content='Чуваки' />
      </Helmet>
      <section className='info-section'>
        <div className="parallax-grid">
          <div className='parallax-banner-1'>
            <img src={require('../assets/img/banner1.png')} alt="" />
          </div>
          <div className='parallax-banner-2'>
            <img src={require('../assets/img/banner2.png')} alt="" />
          </div>
          <div className='parallax-banner-3'>
            <img src={require('../assets/img/banner3.png')} alt="" />
          </div>
          <div className='parallax-banner-4'>
            <img src={require('../assets/img/banner4.png')} alt="" />
          </div>
        </div>
        <div className='parallax-img'>
          <ScrollParallax>
            <img src={require('../assets/img/tomloading.png')} alt="" />
          </ScrollParallax>
        </div>

      </section>
      <section className='main-section'>
        <div className='main-page-grid-container'>

          {games_store.games.length > 0 ?
            <div className="new-games-grid-container">
              <div className="main-page-section-title">
                <h1>Скоро выходят</h1>
              </div>
              {games_store.games.map((game) =>
                <div key={game.id}>
                  <GameCard
                    gameId={game.id}
                    gameSlug={game.slug}
                    gameCover={game.cover}
                    gameTitle={game.title}
                    gameRelease={game.release}
                    activityType={''} />
                </div>
              )}
            </div>
            : null}

          {artilce_store.articles.length > 0 ?
            <div className="news-articles-grid-container">
              <div className="main-page-section-title">
                <h1><Link to='/news'>Новости</Link></h1>
              </div>
              {artilce_store.articles.map((article) =>
                <div key={article.id}>
                  <NewsCard
                    newsId={article.id}
                    newsSlug={article.slug}
                    newsCover={article.cover}
                    newsTitle={article.title}
                    newsText={article.snippet}
                    newsAuthor={article.username}
                    newsDate={article.created_at}
                  />
                </div>
              )}
            </div>
            : null}

          {review_store.reviews.length > 0 ?
            <div className="reviews-grid-container">
              <div className="main-page-section-title">
                <h1>Популярные Отзывы</h1>
              </div>
              {review_store.reviews.map((review) =>
                <div key={review.id}>
                  <MainPageReviewCard
                    reviewId={review.id}
                    reviewSlug={review.slug}
                    reviewCover={review.cover}
                    reviewGrade={review.grade}
                    reviewTitle={review.title}
                    reviewComment={review.comment}
                    reviewUsername={review.username}
                    reviewLikeCount={review.like_count}
                    reviewHasAuthorLike={Number(review.hasAuthorLike)}
                  />
                </div>
              )}
            </div>
            : null}
        </div>
      </section>
    </>
  )
};

export default observer(MainPage);