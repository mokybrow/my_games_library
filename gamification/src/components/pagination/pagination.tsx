import React, { FC, useContext, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'
import './pagination.css'

export interface Pagination {
    currentPage: number
    pageCount: number
}

const Pagination: FC<Pagination> = ({ currentPage, pageCount }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { games_store } = useContext(Context);
    const pageParam = searchParams.get('page');
    const sortParam = searchParams.get('sort');
    const filterParam = searchParams.get('filter');
    const pageLimitElement = 24


    const pageDown = () => {

        if (sortParam !== null && filterParam !== null) {
            setSearchParams({ page: String(currentPage - 1), sort: String(sortParam), filter: String(filterParam) })
            games_store.getGameByPage(Number(pageParam) - 1, pageLimitElement, sortParam, null, filterParam)
        }
        if (sortParam === null && filterParam !== null) {
            setSearchParams({ page: String(currentPage - 1), filter: String(filterParam) })
            games_store.getGameByPage(Number(pageParam) - 1, pageLimitElement, null, null, filterParam)
        }
        if (sortParam !== null && filterParam === null) {
            setSearchParams({ page: String(currentPage - 1), sort: String(sortParam) })
            games_store.getGameByPage(Number(pageParam) - 1, pageLimitElement, sortParam, null, null)
        }
        if (sortParam === null && filterParam === null) {
            setSearchParams({ page: String(currentPage - 1) })
            games_store.getGameByPage(Number(pageParam) - 1, pageLimitElement, null, null, null)
        }
    }
    const pageUp = () => {
        if (sortParam !== null && filterParam !== null) {
            setSearchParams({ page: String(currentPage + 1), sort: String(sortParam), filter: String(filterParam) })
            games_store.getGameByPage(Number(pageParam) + 1, pageLimitElement, sortParam, null, filterParam)
        }
        if (sortParam === null && filterParam !== null) {
            setSearchParams({ page: String(currentPage + 1), filter: String(filterParam) })
            games_store.getGameByPage(Number(pageParam) + 1, pageLimitElement, null, null, filterParam)
        }
        if (sortParam !== null && filterParam === null) {
            setSearchParams({ page: String(currentPage + 1), sort: String(sortParam) })
            games_store.getGameByPage(Number(pageParam) + 1, pageLimitElement, sortParam, null, null)
        }
        if (sortParam === null && filterParam === null) {
            setSearchParams({ page: String(currentPage + 1) })
            games_store.getGameByPage(Number(pageParam) + 1, pageLimitElement, null, null, null)
        }
    }
    return (
        <div className="pagination-container">
            <button onClick={pageDown} disabled={currentPage > 1 ? false : true} className='pagination-button'>
                <h1>  {'<'}</h1>
            </button>
            <h1>{currentPage}/{pageCount}</h1>
            <button onClick={pageUp} disabled={currentPage < pageCount ? false : true} className='pagination-button'>
                <h1> {'>'}</h1>
            </button>
        </div>
    )
}

export default observer(Pagination);