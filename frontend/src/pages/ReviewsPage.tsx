import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { Context } from '..';
import { Pagination } from '../components/Pagination';
import { MediumImageCard } from '../components/MediumImageCard';
import '../styles/reviews.css'

const ReviewsPage: FC = () => {
  const { review_store } = useContext(Context);

  const [searchParams, setSearchParams] = useSearchParams();
  const myParam = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState<number>(Number(myParam));
  useEffect(() => {

    review_store.getReviewsFunc(currentPage - 1, 36, false)

  }, [])

  const handlePageClick = async (event: { selected: number; }) => {
    setCurrentPage(currentPage)
    setSearchParams({ page: String(event.selected + 1) });
    setCurrentPage(event.selected + 1)
  };


  if (review_store.isLoading === true) {
    return (
      <section className='loader-section'>
        <div className="lds-spinner"><div></div>
          <div></div><div></div>
          <div></div><div></div><div>
          </div><div></div><div></div><div
          ></div><div></div><div></div>
          <div></div></div>
      </section>
    )
  }

  return (
    <section className='reviews-section'>
      <div className='reviews-grid-container'>
        {review_store.reviews.length > 0 ? <>{review_store.reviews.map(review =>
          <>
            <MediumImageCard key={review.id} src={review.cover}  title={review.title} username={review.username} comment={review.comment} img={review.img} grade={review.grade} slug={review.slug} columnSpan={2} created_at={review.created_at}/>

          </>
        )}</> :

          <div className="error-card-container">
            Пользователи не создали ни одного списка
          </div>}
      </div>

      <Pagination initialPage={currentPage - 1}
        pageCount={Math.ceil(review_store.pageCount)}
        onChange={handlePageClick} />
    </section>
  )
}


export default observer(ReviewsPage);