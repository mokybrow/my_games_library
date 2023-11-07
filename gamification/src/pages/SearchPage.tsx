import React, { useContext, useEffect } from 'react'
import '../styles/search-page.css'
import SearchInput from '../components/search-items/search-input'
import { observer } from 'mobx-react-lite'
import SearchItem from '../components/search-items/search-item'
import { Context } from '..'
import { useSearchParams } from 'react-router-dom'

const SearchPage = () => {
    const { search_store } = useContext(Context);
    const [searchParams, setSearchParams] = useSearchParams();
    const tagParam = searchParams.get('tag');
    const titleParam = searchParams.get('title');

    useEffect(() => {
        search_store.searchFunc(String(tagParam), String(titleParam))
    }, [])
    if (search_store.isLoading) {
        return (
            <div className='loading-page'>
                <img src={require('../assets/img/dude.jpeg')} alt="Dude" />
            </div>
        )
    }
    return (
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
    )
}

export default observer(SearchPage);