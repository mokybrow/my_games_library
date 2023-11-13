import React, { useContext, useEffect } from 'react'
import '../styles/reviews-page.css'
import { Context } from '..';
import { useSearchParams } from 'react-router-dom';
import NewsCard from '../components/newscard/news-card';
import { observer } from 'mobx-react-lite';
import ReviewsPageSortSelect from '../components/filterselect/reviewpage-sort';
import ReviewsPagePagination from '../components/pagination/reviewspage-pagination';
import Loader from '../components/loader/loader';
import { Helmet } from 'react-helmet';

const ReviewsPage = () => {
    const { artilce_store } = useContext(Context);
    const pageLimitElement = 24
    const [searchParams, setSearchParams] = useSearchParams();
    const pageParam = searchParams.get('page');
    const sortParam = searchParams.get('sort');

    useEffect(() => {
        window.scrollTo(0, 0);
        if (pageParam === null) {
            artilce_store.getAllArticleFunc(1, pageLimitElement, sortParam, 'review')
        }
        else {
            artilce_store.getAllArticleFunc(Number(pageParam), pageLimitElement, sortParam, 'review')
        }
    }, [artilce_store])

    if (artilce_store.isLoading) {
        return (
            <Loader />
        )
    }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Обзоры</title>
                <link rel="canonical" href={'https://dudesplay.ru/reviews'} />
                <meta name="title" content='Чуваки' />
                <meta name="description" content='Обзоры игр, ревью, эссе и многое другое' />
                <meta property="og:site_name" content='Чуваки' />
                <meta property="og:type" content='article' />
                <meta property="og:title" content='Чуваки' />
                <meta property="og:description" content='Обзоры игр, ревью, эссе и многое другое' />
            </Helmet>
            <section className='reviews-page-section'>
                <div className="reviews-page-grid">
                    <div className="filters-container">
                        <ReviewsPageSortSelect />
                    </div>
                    {artilce_store.articles.map((article) =>
                        <div key={article.id}>
                            <NewsCard
                                newsId={article.id}
                                newsSlug={article.slug}
                                newsCover={article.cover}
                                newsTitle={article.title}
                                newsText={article.text}
                                newsAuthor={article.username}
                                newsDate={article.created_at}
                            />
                        </div>
                    )}
                    <ReviewsPagePagination currentPage={pageParam !== null ? Number(pageParam) : 1}
                        pageCount={Math.ceil(artilce_store.pageCount / pageLimitElement)} />
                </div>
            </section>
        </>
    )
}

export default observer(ReviewsPage);