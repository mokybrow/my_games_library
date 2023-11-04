import React, { useContext, useEffect } from 'react'
import '../styles/reviews-page.css'
import { Context } from '..';
import { useSearchParams } from 'react-router-dom';
import NewsCard from '../components/newscard/news-card';
import { observer } from 'mobx-react-lite';
import ReviewsPageSortSelect from '../components/filterselect/reviewpage-sort';
import ReviewsPagePagination from '../components/pagination/reviewspage-pagination';

const ReviewsPage = () => {
    const { artilce_store } = useContext(Context);
    const pageLimitElement = 24
    const [searchParams, setSearchParams] = useSearchParams();
    const pageParam = searchParams.get('page');
    const sortParam = searchParams.get('sort');

    useEffect(() => {
        if (pageParam === null) {
            artilce_store.getAllArticleFunc(1, pageLimitElement, sortParam, 'review')
        }
        else {
            artilce_store.getAllArticleFunc(Number(pageParam), pageLimitElement, sortParam, 'review')
        }
    }, [artilce_store])

    return (
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
    )
}

export default observer(ReviewsPage);