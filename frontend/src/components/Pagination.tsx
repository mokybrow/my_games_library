import React, { FC } from 'react'
import ReactPaginate from 'react-paginate';


export interface PaginatoProps {
    initialPage: number,
    marginPagesDisplayed?: number,
    pageCount: number,
    pageRangeDisplayed?: number,
    onChange: ({ selected }: { selected: number }) => void;
}

export const Pagination: React.FC<PaginatoProps> = ({
    initialPage,
    marginPagesDisplayed,
    pageCount,
    pageRangeDisplayed,
    onChange,
}) => {
    return (
        <ReactPaginate
            
            breakLabel=""
            nextLabel=">"
            previousLabel="<"
            initialPage={initialPage}
            renderOnZeroPageCount={null}
            pageCount={pageCount}
            marginPagesDisplayed={marginPagesDisplayed}
            pageRangeDisplayed={pageRangeDisplayed}
            onPageChange={onChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
            className='pagination-container'
        />
    )
}
