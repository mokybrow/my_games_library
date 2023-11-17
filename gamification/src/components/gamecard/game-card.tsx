import React, { FC } from 'react'
import './game-card.css'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { FormattedDate } from 'react-intl'

export interface GameCard {
    gameId: string
    gameSlug: string
    gameCover: string
    gameTitle: string
    activityType: string
    gameRelease?: any
}


const GameCard: FC<GameCard> = ({ gameId, gameSlug, gameCover, gameTitle, activityType, gameRelease }) => {

    console.log(gameRelease)
    return (
        <Link key={gameId} to={'/game/' + gameSlug}>
            <div className="game-card-cover-container">
                <img src={gameCover} width={50} height={50} />
                <div className="title-card-body-profile">
                    <div className="title-card">
                        <span className="card-title">{gameTitle}</span>
                    </div>
                    {gameRelease == undefined ? null :
                        <div className="title-card">
                            <FormattedDate
                                value={gameRelease}
                                year='numeric'
                                month='short'
                                day='numeric'
                            />
                        </div>}
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