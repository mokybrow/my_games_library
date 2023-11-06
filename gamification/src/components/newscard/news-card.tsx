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
    newsAuthor: string
    newsDate: Date
}

const NewsCard: FC<NewsCard> = ({ newsId, newsSlug, newsCover, newsTitle, newsText, newsAuthor, newsDate }) => {
    var parse = require('html-react-parser');

    return (

        <div className="news-card-cover-container">
            <div className="background-wrap"></div>
            {/* {newsCover == null ? null : <img src={newsCover} width={200} height={200} />} */}
            <div className="news-info-container">
                <Link key={newsId} to={'/article/' + newsSlug} className='news-card'>
                    <div className="news-title-container">
                        <span className="news-title">{newsTitle}</span>
                    </div>
                </Link>
                <span className='author-name'>
                    <span>Автор </span>
                    <Link to={'/' + { newsAuthor }}>
                        <span>{newsAuthor}</span>
                    </Link>
                </span>
                <div className="news-text-container">
                    <span className="news-text">
                        {parse(newsText)}
                    </span>
                </div>

            </div>
        </div>

    )
}

export default observer(NewsCard);