import React, { FC } from 'react'
import './list-card.css'
import { Link } from 'react-router-dom'

export interface ListPageCard {
    listId: string
    listSlug: string
    listCover: string
    listTitle: string
}

export const ListPageCard: FC<ListPageCard> = ({ listId, listSlug, listCover, listTitle }) => {
    return (
        <Link key={listId} to={'/list/' + listSlug}>
            <div className="profile-card-cover-container">
                <img src={"data:image/jpeg;base64," + listCover}/>
                <div className="title-card-body-profile">
                    <div className="title-card">
                        <span className="card-title">{listTitle}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}