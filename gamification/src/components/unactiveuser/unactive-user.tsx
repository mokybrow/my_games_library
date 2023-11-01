import React, { FC } from 'react'
import './unactive-user.css'

export interface UnactiveUser {
    children: string
}

export const UnactiveUser: FC<UnactiveUser> = ({ children }) => {
    return (
        <div className="unactive-container">
            <h1>{children}</h1>
        </div>
    )
}