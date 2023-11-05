import React, { FC } from 'react'
import './action-button.css'
import { Link } from 'react-router-dom'

export interface FollowButton {
    onClick: any
    children: string
}

export const FollowButton: FC<FollowButton> = ({ onClick, children }) => {
    return (
        <button onClick={onClick} className="action-button" >

            {children}

        </button>

    )
}