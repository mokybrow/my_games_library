import React, { FC } from 'react'
import ReactPaginate from 'react-paginate';


export interface PaginatoProps {
    initialPage: number,
    marginPagesDisplayed?: number,
    pageCount: number,
    pageRangeDisplayed?: number,
    onChange: ({ selected }: { selected: number }) => void;
}

export const Paginator: FC<PaginatoProps> = ({
    initialPage,
    marginPagesDisplayed,
    pageCount,
    pageRangeDisplayed,
    onChange,
}) => {
    return (
        <ReactPaginate
            className='pagination-container'
            breakLabel="..."
            nextLabel="next >"
            previousLabel="< previous"
            initialPage={initialPage}
            renderOnZeroPageCount={null}
            pageCount={pageCount}
            marginPagesDisplayed={marginPagesDisplayed}
            pageRangeDisplayed={pageRangeDisplayed}
            onPageChange={onChange}
            activeClassName='active'
        />
    )
}
