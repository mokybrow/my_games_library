import React, { FC, useContext, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'
import './pagination.css'

export interface Pagination {
    currentPage: number
    pageCount: number
}

const ListsPagePagination: FC<Pagination> = ({ currentPage, pageCount }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { list_store } = useContext(Context);
    const pageParam = searchParams.get('page');
    const sortParam = searchParams.get('sort');
    const pageLimitElement = 24

    const pageDown = () => {

        if (sortParam !== null ) {
            setSearchParams({ page: String(currentPage - 1), sort: String(sortParam) })
            list_store.getAllLists(Number(pageParam) - 1, pageLimitElement, sortParam)
        }

        if (sortParam === null ) {
            setSearchParams({ page: String(currentPage - 1) })
            list_store.getAllLists(Number(pageParam) - 1, pageLimitElement, null)
        }
    }
    const pageUp = () => {
        if (sortParam !== null) {
            setSearchParams({ page: String(currentPage + 1), sort: String(sortParam)})
            list_store.getAllLists(Number(pageParam) + 1, pageLimitElement, sortParam)
        }
        if (sortParam === null) {
            setSearchParams({ page: String(currentPage + 1)})
            list_store.getAllLists(Number(pageParam) + 1, pageLimitElement, null)
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

export default observer(ListsPagePagination);