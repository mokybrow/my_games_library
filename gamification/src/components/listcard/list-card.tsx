import React, { FC } from 'react'
import './list-card.css'
import { Link } from 'react-router-dom'

export interface ListCard {
    children: string
    linkTo: string
    img: string
}

export const ListCard: FC<ListCard> = ({ children, linkTo, img }) => {
    return (
        <Link to={linkTo} className='list-cover-link' reloadDocument>
            <div className="list-cover-container">
                <img src={require(`../../assets/icons/${img}`)} alt="" />
            </div>
        </Link>
    )
}