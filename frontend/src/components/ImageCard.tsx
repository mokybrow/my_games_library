import React, { FC } from 'react'

export interface ImageCardProps {
    src: string,
    title: string,
}


export const ImageCard: FC<ImageCardProps> = ({ src, title }) => {
    return (
        <>
            <div className="game-card-cover-container">
                <img src={src} alt='' width="150" height="150" />
                <div className="title-card-body">
                    <div className="title-card">
                        <span className="card-title">{title}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
