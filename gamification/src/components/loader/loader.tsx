import React from 'react'
import './loader.css'

const Loader = () => {
    return (
        <div className='loading-page'>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <p>Подготавливаем страницу</p>
        </div>
    )
}

export default Loader