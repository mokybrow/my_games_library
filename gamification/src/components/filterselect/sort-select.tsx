import React, { FC, useContext } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import './filter-sort-select.css'


const SortSelect: FC = () => {
    const { games_store } = useContext(Context);
    const pageLimitElement = 24
    const [searchParams, setSearchParams] = useSearchParams();
    const pageParam = searchParams.get('page');
    const sortParam = searchParams.get('sort');
    const filterParam = searchParams.get('filter');

    const onClickSort = (sort: string) => {
        if (pageParam === null) {
            if (sort !== 'false') {
                if (filterParam !== null) {
                    setSearchParams({ sort: String(sort), filter: String(filterParam) })
                    games_store.getGameByPage(1, pageLimitElement, sort, null, filterParam)
                }
                if (filterParam === null) {
                    setSearchParams({ sort: String(sort) })
                    games_store.getGameByPage(1, pageLimitElement, sort, null, null)

                }
            }
            if (sort === 'false') {
                if (filterParam !== null) {
                    setSearchParams({ filter: String(filterParam) })
                    games_store.getGameByPage(1, pageLimitElement, null, null, filterParam)
                }
                if (filterParam === null) {
                    setSearchParams({})
                    games_store.getGameByPage(1, pageLimitElement, null, null, null)

                }
            }
        }
        if (pageParam !== null) {
            if (sort !== 'false') {
                if (filterParam !== null) {
                    setSearchParams({ page: String(1), sort: String(sort), filter: String(filterParam) })
                    games_store.getGameByPage(1, pageLimitElement, sort, null, filterParam)
                }
                if (filterParam === null) {
                    setSearchParams({ page: String(1), sort: String(sort) })
                    games_store.getGameByPage(1, pageLimitElement, sort, null, null)

                }
            }
            if (sort === 'false') {
                if (filterParam !== null) {
                    setSearchParams({ page: String(1), filter: String(filterParam) })
                    games_store.getGameByPage(1, pageLimitElement, null, null, filterParam)
                }
                if (filterParam === null) {
                    setSearchParams({ page: String(1) })
                    games_store.getGameByPage(1, pageLimitElement, null, null, null)

                }
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

export default observer(SortSelect);