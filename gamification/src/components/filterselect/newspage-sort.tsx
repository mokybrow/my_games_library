import React, { FC, useContext } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import './filter-sort-select.css'


const NewsPageSortSelect: FC = () => {
    const { artilce_store } = useContext(Context);
    const pageLimitElement = 24
    const [searchParams, setSearchParams] = useSearchParams();
    const pageParam = searchParams.get('page');
    const sortParam = searchParams.get('sort');

    const onClickSort = (sort: string) => {
        if (pageParam === null) {
            if (sort !== 'false') {
                setSearchParams({ sort: String(sort) })
                artilce_store.getAllArticleFunc(1, pageLimitElement, sort, 'news')
            }
            if (sort === 'false') {
                setSearchParams({})
                artilce_store.getAllArticleFunc(1, pageLimitElement, null, 'news')
            }
        }

    }
    return (
        <select className='sort-filter-selector' defaultValue={sortParam !== null ? sortParam : 'false'} onChange={(event) => onClickSort(event.target.value)}>
            <option value='false'>Без Сортировки</option>
            <option value="old">Сначала старые</option>
            <option value="new">Сначала новые</option>
            <option value="alphabetically-asc">По алфавиту А-Я</option>
            <option value="alphabetically-desc">По алфавиту Я-А</option>
            <option value="popular-asc">Сначала популярные</option>
            <option value="popular-desc">Сначала не популярные</option>
        </select>

    )
}

export default observer(NewsPageSortSelect);