import { useContext, useEffect } from 'react';
import '../styles/main-page.css'
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import GameCard from '../components/gamecard/game-card';
import NewsCard from '../components/newscard/news-card';

const MainPage = () => {
  const { games_store } = useContext(Context);
  const { artilce_store } = useContext(Context);
  const { review_store } = useContext(Context);

  useEffect(() => {
    games_store.getNewstGame()
    artilce_store.getAllArticleFunc(1, 4, null, true)
    review_store.getReviewsFunc(0, 4, true, null)

  }, [games_store, artilce_store, review_store])

  if (games_store.isLoading === true || artilce_store.isLoading === true || review_store.isLoading === true) {
    return (
      <div>Loading...</div>
    )
  }

  return (
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
                  activityType={''} />
              </div>
            )}
          </div>
          : null}

        {artilce_store.articles.length > 0 ?
          <div className="news-articles-grid-container">
            <div className="main-page-section-title">
              <h1>Новости</h1>
            </div>
            {artilce_store.articles.map((article) =>
              <NewsCard
                newsId={article.id}
                newsSlug={article.slug}
                newsCover={article.cover}
                newsTitle={article.title}
                newsText={article.text} />
            )}
          </div>
          : null}

        {artilce_store.articles.length > 0 ?
          <div className="reviews-grid-container">
            <div className="main-page-section-title">
              <h1>Последение Отзывы</h1>
            </div>
            {artilce_store.articles.map((article) =>
              <NewsCard
                newsId={article.id}
                newsSlug={article.slug}
                newsCover={article.cover}
                newsTitle={article.title}
                newsText={article.text} />
            )}
          </div>
          : null}
      </div>
    </section>
  )
};

export default observer(MainPage);