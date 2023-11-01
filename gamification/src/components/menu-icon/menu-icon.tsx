import React, { FC } from 'react'
import './menu-icon.css'

export interface MenuIcon {
    title: string
    img: string
    children: any
}

export const MenuIconItem: FC<MenuIcon> = ({ title,  img}) => {
    return (
        <div className='menu-item-icon'>
            <img src={require(img)} alt="" width={54} height={54} />
            <span>{title}</span>
        </div>

    )
}