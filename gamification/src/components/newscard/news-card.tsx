import React, { FC } from 'react'
import './news-card.css'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

export interface NewsCard {
    newsId: string
    newsSlug: string
    newsCover: string
    newsTitle: string
    newsText: string
}

const NewsCard: FC<NewsCard> = ({ newsId, newsSlug, newsCover, newsTitle, newsText }) => {
    return (
        <Link key={newsId} to={'/game/' + newsSlug}>
            <div className="news-card-cover-container">
                <img src={newsCover} width={200} height={200} />
                <div className="title-card-body-profile">
                    <div className="title-card">
                        <span className="card-title">{newsTitle}</span>
                    </div>

                    <div className="title-card-activity">

                        <span className="card-title-activity">
                            {newsText}
                        </span>

                    </div>

                </div>
            </div>

        </Link>
    )
}

export default observer(NewsCard);