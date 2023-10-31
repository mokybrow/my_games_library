import React, { FC } from 'react'
import './dropdown-button.css'

export interface DropdownButtonContent {
    userImg: string
    username: string
}

export const DropdownButtonContent: FC<DropdownButtonContent> = ({ userImg, username }) => {
    return (
        <button className="dropdown-button">
            <img className='dropdown-img' src={`data:image/jpeg;base64,${userImg}`} width={20} height={20} alt=''/>
            {username}
        </button>
    )
}