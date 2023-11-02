import React, { FC } from 'react'
import './action-button.css'
import { Link } from 'react-router-dom'

export interface SubmitButton {
    type: any
    onClick: any
    children: string
}

export const SubmitButton: FC<SubmitButton> = ({ type, children, onClick }) => {
    return (
        <button type={type} className="action-button" onClick={onClick}>
            {children}
        </button>

    )
}