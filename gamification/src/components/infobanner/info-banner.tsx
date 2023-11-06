import React, { FC } from 'react'
import './info-banner.css'

export interface InfoBanner {
    children: any
}

export const InfoBanner: FC<InfoBanner> = ({ children }) => {
    return (
        <div className="info-banner-container">
            {children}
        </div>
    )
}