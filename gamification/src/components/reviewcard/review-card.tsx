import React, { FC } from 'react'
import './review-card.css'
import { Link } from 'react-router-dom'

export interface ReviewCard {
    reviewSlug: string
    reviewCover: string
    reviewGrade: number
}

export const ReviewCard: FC<ReviewCard> = ({ reviewSlug, reviewCover, reviewGrade }) => {
    return (
        <Link key={reviewSlug} to={'/game/' + reviewSlug}>
            <div className="profile-card-cover-container">
                <img src={reviewCover} />
                <div className="title-card-body-rate">
                    <div className="title-card">
                        <span className="card-title-grade">{reviewGrade}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}