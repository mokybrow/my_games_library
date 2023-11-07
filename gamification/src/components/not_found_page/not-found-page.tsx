import React, { FC } from 'react'
import './not-found-page.css'



export const NotFoundPage: FC = () => {
    return (
        <section className='not-found-page-section'>
            <div className="not-found-page">
                <img src={require('../../assets/img/tired_tom.jpeg')} alt="deadinside dudes" />
                <h1>404 Страница не найдена</h1>
            </div>
        </section>
    )
}