import React, { FC, useContext } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'

export interface Pagination {
    currentPage: number
    pageCount: number

}

const Pagination: FC<Pagination> = ({ currentPage, pageCount }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { games_store } = useContext(Context);
    const pageLimitElement = 36

    return (
        <div className="pagination-container">
            <button onClick={() => {
                { setSearchParams({ page: String(currentPage - 1) }) } {
                    games_store.getGameByPage(currentPage, pageLimitElement, null, null, null)
                }
            }} disabled={currentPage > 1 ? false : true}>
                {'<'}
            </button>
            {currentPage}/{pageCount}
            <button onClick={() => {
                { setSearchParams({ page: String(currentPage + 1) }) } {
                    games_store.getGameByPage(currentPage, pageLimitElement, null, null, null)
                }
            }} disabled={currentPage < pageCount? false : true}>
                {'>'}
            </button>
        </div>
    )
}

export default observer(Pagination);