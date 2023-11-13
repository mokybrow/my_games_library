import React, { useContext, useEffect } from 'react'
import '../styles/search-page.css'
import SearchInput from '../components/search-items/search-input'
import { observer } from 'mobx-react-lite'
import SearchItem from '../components/search-items/search-item'
import { Context } from '..'
import { useSearchParams } from 'react-router-dom'
import Loader from '../components/loader/loader'
import { Helmet } from "react-helmet-async";

const SearchPage = () => {
    const { search_store } = useContext(Context);
    const [searchParams, setSearchParams] = useSearchParams();
    const tagParam = searchParams.get('tag');
    const titleParam = searchParams.get('title');

    useEffect(() => {
        window.scrollTo(0, 0);
        search_store.searchFunc(String(tagParam), String(titleParam))
    }, [])

    if (search_store.isLoading) {
        return (
            <Loader />
        )
    }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Поиск</title>
                <link rel="canonical" href={'https://dudesplay.ru/search'} />
                <meta name="title" content='Чуваки' />
                <meta name="description" content='Находи интересующие тебя игры' />
                <meta property="og:site_name" content='Чуваки' />
                <meta property="og:title" content='Чуваки' />
                <meta property="og:description" content='Находи интересующие тебя игры' />
            </Helmet>
            <section className='search-page-section'>
                <div className="search-page-grid">
                    <SearchInput />
                    {search_store.items.length > 0 ?
                        <>
                            {search_store.items.map((item) =>
                                <div key={item.slug}>
                                    <SearchItem tag={''} ItemSlug={item.slug} ItemCover={item.cover} ItemTitle={item.title} />

                                </div>
                            )}
                        </>
                        : null}
                </div>
            </section>
        </>
    )
}

export default observer(SearchPage);