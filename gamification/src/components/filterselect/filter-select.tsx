import React, { FC, useContext } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import './filter-sort-select.css'

const FilterSelect: FC = () => {
    const { games_store } = useContext(Context);
    const pageLimitElement = 24
    const [searchParams, setSearchParams] = useSearchParams();
    const pageParam = searchParams.get('page');
    const sortParam = searchParams.get('sort');
    const filterParam = searchParams.get('filter');

    const onFilterSort = (filter: string) => {

        if (pageParam === null) {
            if (filter !== 'false') {
                if (sortParam !== null) {
                    setSearchParams({ sort: String(sortParam), filter: String(filter) })
                    games_store.getGameByPage(1, pageLimitElement, sortParam, null, filter)
                }
                if (sortParam === null) {
                    setSearchParams({ filter: String(filter) })
                    games_store.getGameByPage(1, pageLimitElement, null, null, filter)
                }
            }
            if (filter === 'false') {
                if (sortParam !== null) {
                    setSearchParams({ sort: String(sortParam) })
                    games_store.getGameByPage(1, pageLimitElement, sortParam, null, null)
                }
                if (sortParam === null) {
                    setSearchParams({})
                    games_store.getGameByPage(1, pageLimitElement, null, null, null)
                }
            }
        }
        if (pageParam !== null) {
            if (filter !== 'false') {
                if (sortParam !== null) {
                    setSearchParams({ page: String(1), sort: String(sortParam), filter: String(filter) })
                    games_store.getGameByPage(1, pageLimitElement, sortParam, null, filter)
                }
                if (sortParam === null) {
                    setSearchParams({ page: String(1), filter: String(filter) })
                    games_store.getGameByPage(1, pageLimitElement, null, null, filter)
                }
            }
            if (filter === 'false') {
                if (sortParam !== null) {
                    setSearchParams({ page: String(1), sort: String(sortParam) })
                    games_store.getGameByPage(1, pageLimitElement, sortParam, null, null)
                }
                if (sortParam === null) {
                    setSearchParams({ page: String(1) })
                    games_store.getGameByPage(1, pageLimitElement, null, null, null)
                }
            }
        }

    }
    return (

        <select className='sort-filter-selector' defaultValue={filterParam !== null ? filterParam : 'false'} onChange={(event) => onFilterSort(event.target.value)}>
            <option value='false'>Любой жанр</option>
            <option value="Action">Экшн</option>
            <option value="Shooter">Шутер</option>
            <option value="Fighting">Файтинг</option>
            <option value="Adventure">Приключение</option>
            <option value="RPG">РПГ</option>
            <option value="Puzzle">Головоломка</option>
            <option value="Platformer">Платформер</option>
            <option value="Indie">Инди</option>
            <option value="Simulation">Симулятор</option>
            <option value="Arcade">Аркада</option>
            <option value="Massively Multiplayer">Многопользовательские</option>
            <option value="Casual">Казуальные</option>
            <option value="Strategy">Стратегии</option>
            <option value="Family">Семейные</option>
            <option value="Educational">Обучающие</option>
        </select>
    )
}

export default observer(FilterSelect);