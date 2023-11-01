import React, { FC } from 'react'
import './action-button.css'
import { Link } from 'react-router-dom'

export interface ActionButton {
    onClick: any
    children: string
}

export const ActionButton: FC<ActionButton> = ({ onClick, children }) => {
    return (
        <Link to={onClick} className="action-button" >

            {children}

        </Link>

    )
}