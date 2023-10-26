import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { Context } from '..';
import { Pagination } from '../components/Pagination';

import '../styles/reviews.css'
import { ArticleCard } from '../components/ArticleCard';
import { ReviewCard } from '../components/ReviewCard';

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
    <section className='page-section'>
      <div className="grid-container">

        {<>{review_store.reviews.map(review =>
          <div key={review.id} className="review-page-artilce-card-container" >
            <ReviewCard

              src={review.cover}
              title={review.title}
              username={review.username}
              comment={review.comment}
              img={`data:image/jpeg;base64,${review.img}`}
              like_count={review.grade}
              slug={review.slug}
              columnSpan={2}
              created_at={review.created_at}
              article_id={review.id}
              offset={0}
              limit={4}
              popular={null}
              date={true} />
          </div>

        )}</>}


        <Pagination initialPage={currentPage - 1}
          pageCount={Math.ceil(review_store.pageCount)}
          onChange={handlePageClick} />
      </div>

    </section>
  )
}


export default observer(ReviewsPage);