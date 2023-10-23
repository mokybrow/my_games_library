import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react'
import { GamesResponse } from '../models/response';
import GameService from '../service/GameService';
import { Link } from 'react-router-dom';
import { Context } from '..';
import { FormattedMessage } from 'react-intl';
import { ArticleCard } from '../components/ArticleCard';
import { ReviewCard } from '../components/ReviewCard';


const HomePage: FC = () => {

  const { games_store } = useContext(Context);
  const { artilce_store } = useContext(Context);
  const { review_store } = useContext(Context);

  useEffect(() => {
    games_store.getNewstGame()
    artilce_store.getAllArticleFunc(0, 4, null, true)
    review_store.getReviewsFunc(0, 4, true)

  }, [games_store, artilce_store])


  if (games_store.isLoading === true || artilce_store.isLoading === true || review_store.isLoading === true) {
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
      <section className='home-page-game-section'>

        <div className='header-new-game'>

          <Link className='header-new-game' to='/games?page=1&sort=releasedesc' >
            <h1>
              <FormattedMessage id="content.headers.newsgames" />
            </h1>
          </Link>
        </div>

        {games_store.games.map(game =>
          <Link key={game.id} to={'game/' + game.slug} reloadDocument>
            <div className="game-card-cover-container">
              {game.cover != null ? <img src={game.cover} alt='' width="200" height="200" /> : <img src={require('../icons/img-not-found.png')} alt='' width="200" height="200" />}
              <div className="title-card-body">
                <div className="title-card">
                  <span className="card-title">{game.title}</span>
                </div>
              </div>
            </div>
          </Link>)}

        <div className='header-new-game'>
          <Link className='header-new-game' to='/articles?page=1' >
            <h1>
              <FormattedMessage id="content.headers.newarticles" />
            </h1>
          </Link>
        </div>

        {<>{artilce_store.articles.map(article =>
          <div key={article.id} className="home-page-artilce-card-container" style={{ gridColumnEnd: `span 3` }}>
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



        <div className='header-new-game'>
          <Link className='header-new-game' to='/reviews?page=1' >
            <h1>
              <FormattedMessage id="content.headers.popularreviews" />
            </h1>
          </Link>
        </div>

        {<>{review_store.reviews.map(review =>
          <div key={review.id} className="home-page-artilce-card-container" style={{ gridColumnEnd: `span 3` }}>
            <ReviewCard

              src={review.cover}
              title={review.title}
              username={review.username}
              comment={review.comment}
              img={`data:image/jpeg;base64,${review.img}`}
              like_count={review.like_count}
              slug={review.slug}
              columnSpan={3}
              created_at={review.created_at}
              article_id={review.id}
              offset={0}
              limit={4}
              popular={null}
              date={true} />
          </div>

        )}</>}
      </section>
    </>
  )
}


export default observer(HomePage);