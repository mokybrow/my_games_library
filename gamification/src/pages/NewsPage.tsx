import React, { useContext, useEffect } from 'react'
import '../styles/news-page.css'
import { Context } from '..';
import { useSearchParams } from 'react-router-dom';
import NewsCard from '../components/newscard/news-card';
import { observer } from 'mobx-react-lite';
import NewsPageSortSelect from '../components/filterselect/newspage-sort';
import NewsPagePagination from '../components/pagination/newspage-pagination';
import Loader from '../components/loader/loader';

const NewsPage = () => {
    const { artilce_store } = useContext(Context);
    const pageLimitElement = 24
    const [searchParams, setSearchParams] = useSearchParams();
    const pageParam = searchParams.get('page');
    const sortParam = searchParams.get('sort');

    useEffect(() => {
        window.scrollTo(0, 0);
        if (pageParam === null) {
            artilce_store.getAllArticleFunc(1, pageLimitElement, sortParam, 'news')
        }
        else {
            artilce_store.getAllArticleFunc(Number(pageParam), pageLimitElement, sortParam, 'news')
        }
    }, [artilce_store])

    if (artilce_store.isLoading) {
        return (
            <Loader />
        )
    }
    return (
        <section className='news-page-section'>
            <div className="news-page-grid">
                <div className="filters-container">
                    <NewsPageSortSelect />
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
                <NewsPagePagination currentPage={pageParam !== null ? Number(pageParam) : 1}
                    pageCount={Math.ceil(artilce_store.pageCount / pageLimitElement)} />
            </div>
        </section>
    )
}

export default observer(NewsPage);