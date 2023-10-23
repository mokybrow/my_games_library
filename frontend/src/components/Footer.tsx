import React, { FC, useContext, useEffect, useState } from 'react'

import { observer } from 'mobx-react-lite';
import './styles/footer.css'
import { Link } from 'react-router-dom';



const Footer: FC = () => {

return(
    <footer className="Footer">
        <div className="footer-grid">
            <Link to='/about-us'>О нас</Link>
            <Link to='/rules'>Правила</Link>
            <Link to='/subscribe'>Подписка</Link>
            <Link to='/help'>Помощь</Link>
            <Link to='/contacts'>Контакты</Link>
            <Link to='https://rawg.io/'> Основано на RAWG</Link>
            <div className="footer-studio-name">
                2023 Культ Медведя 
            </div>
        </div>

    </footer>
)

}


export default observer(Footer);