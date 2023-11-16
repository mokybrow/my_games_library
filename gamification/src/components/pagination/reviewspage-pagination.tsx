import React, { FC, useContext, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'
import './pagination.css'

export interface Pagination {
    currentPage: number
    pageCount: number
}

const ReviewsPagePagination: FC<Pagination> = ({ currentPage, pageCount }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { artilce_store } = useContext(Context);
    const pageParam = searchParams.get('page');
    const sortParam = searchParams.get('sort');
    const pageLimitElement = 24

    const pageDown = () => {

        if (sortParam !== null ) {
            setSearchParams({ page: String(currentPage - 1), sort: String(sortParam) })
            artilce_store.getAllArticleFunc(Number(currentPage) - 1, pageLimitElement, sortParam, 'review')
        }

        if (sortParam === null ) {
            setSearchParams({ page: String(currentPage - 1) })
            artilce_store.getAllArticleFunc(Number(currentPage) - 1, pageLimitElement, null, 'review')
        }
    }
    const pageUp = () => {
        if (sortParam !== null) {
            setSearchParams({ page: String(currentPage + 1), sort: String(sortParam)})
            artilce_store.getAllArticleFunc(Number(currentPage) + 1, pageLimitElement, sortParam, 'review')
        }
        if (sortParam === null) {
            setSearchParams({ page: String(currentPage + 1)})
            artilce_store.getAllArticleFunc(Number(currentPage) + 1, pageLimitElement, null, 'review')
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

export default observer(ReviewsPagePagination);