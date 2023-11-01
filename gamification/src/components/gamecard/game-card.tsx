import React, { FC } from 'react'
import './game-card.css'
import { Link } from 'react-router-dom'

export interface GameCard {
    gameId: string
    gameSlug: string
    gameCover: string
    gameTitle: string
    activityType: string
}

export const GameCard: FC<GameCard> = ({ gameId, gameSlug, gameCover, gameTitle, activityType }) => {
    return (
        <Link key={gameId} to={'/game/' + gameSlug}>
            <div className="profile-card-cover-container">
                <img src={gameCover} />
                <div className="title-card-body-profile">
                    <div className="title-card">
                        <span className="card-title">{gameTitle}</span>
                    </div>
                    <div className="title-card-activity">

                        <span className="card-title-activity">
                            {activityType == 'passed' ? 'Пройденно' :
                                activityType == 'liked' ? 'Понравилась' :
                                    'Пройдёт'}
                        </span>
                    </div>
                </div>
            </div>

        </Link>
    )
}