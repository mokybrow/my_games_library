import { Link } from 'react-router-dom'
import './footer.css'
import { useContext } from 'react';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

const Footer = () => {

    const { auth_store } = useContext(Context);

    return (

        <footer>
            <div className="footer-grid">
                {/* <h2>Чуваки</h2> */}
                <div className='footer-container'>
                    <h3>Статьи</h3>
                    <Link to={`/news`} reloadDocument>
                        Новости
                    </Link>
                    <Link to={`/reviews`} reloadDocument>
                        Обзоры
                    </Link>
                </div>
                <div className='footer-container'>
                    <h3>Игры</h3>
                    <Link to={`/games?sort=old`} reloadDocument>
                        Старые
                    </Link>
                    <Link to={`/games?sort=new`} reloadDocument>
                        Новые
                    </Link>

                </div>
                <div className='footer-container'>
                    <h3>Профиль</h3>
                    <Link to={`/${auth_store.user.username}`} reloadDocument>
                        Профиль
                    </Link>
                    <Link to={`/${auth_store.user.username}/favorite`} reloadDocument>
                        Любимые
                    </Link>
                    <Link to={`/${auth_store.user.username}/wishlist`} reloadDocument>
                        Пройду
                    </Link>
                    <Link to={`/${auth_store.user.username}/completed`} reloadDocument>
                        Пройденные
                    </Link>

                    <Link to={`/${auth_store.user.username}/lists`} reloadDocument>
                        Списки
                    </Link>
                </div>
                <div className='footer-container'>
                    <h3>Почта для связи</h3>
                    <a href="mailto:mokybrow@yandex.ru">mokybrow@yandex.ru</a>
                </div>
                <div className='footer-container'>
                    <h3>Соц. сети</h3>


                    <a href="https://t.me/dudesdaily" className='footer-social-icons'>
                        <img src={require('../../assets/icons/tglogo.webp')} alt="Telegram" width={24} height={24} />
                        <span>Телеграм</span>
                    </a>


                    <a href="https://vk.com/dudesdaily" className='footer-social-icons'>
                        <img src={require('../../assets/icons/vklogo.webp')} alt="VK" width={24} height={24} />
                        <span>ВК</span>
                    </a>

                </div>
                <div className="main-info-footer">
                    <span>Чуваки 2023</span>
                    <span>Основано на <a href="https://rawg.io/">RAWG</a></span>
                </div>
            </div>

        </footer>
    )
}

export default observer(Footer);
