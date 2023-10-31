import React, { FC } from 'react'
import './dropdown.css'

export interface DropdownContent {

    children: any
}

export const DropdownContent: FC<DropdownContent> = ({ children }) => {
    return (

        <div className="dropdown-content">
            {children}
        </div>

    )
}