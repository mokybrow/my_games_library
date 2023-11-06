import React, { FC } from 'react'
import './game-card.css'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

export interface GameCard {
    gameId: string
    gameSlug: string
    gameCover: string
    gameTitle: string
    activityType: string
}

const GameCard: FC<GameCard> = ({ gameId, gameSlug, gameCover, gameTitle, activityType }) => {
    return (
        <Link key={gameId} to={'/game/' + gameSlug}>
            <div className="game-card-cover-container">
                <img src={gameCover} width={50} height={50}/>
                <div className="title-card-body-profile">
                    <div className="title-card">
                        <span className="card-title">{gameTitle}</span>
                    </div>
                    {activityType !== '' ?
                        <div className="title-card-activity">

                            <span className="card-title-activity">
                                {activityType == 'passed' ? 'Пройденно' :
                                    activityType == 'liked' ? 'Понравилась' :
                                        'Пройдёт'}
                            </span>

                        </div>
                        : null}
                </div>
            </div>
        </Link>
    )
}

export default observer(GameCard);