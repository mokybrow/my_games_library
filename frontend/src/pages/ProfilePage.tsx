import { observer } from 'mobx-react-lite';
import { FC, useContext, useEffect, useState } from 'react';
import { Context } from '..';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UserService from '../service/UserService';
import { GamesResponse } from '../models/response';
import GameService from '../service/GameService';

const ProfilePage: FC = () => {
  const { auth_store } = useContext(Context);
  const { user_store } = useContext(Context);
  const { username } = useParams<string>();

  const followHandler = async () => {
    await UserService.followOnUser(user_store.anotherUser.id)
    user_store.setFollower(true)
  }
  const unFollowHandler = async () => {
    await UserService.unFollowOnUser(user_store.anotherUser.id)
    user_store.setFollower(false)
  }
  useEffect(() => {
    user_store.findUser(String(username))
    if (localStorage.getItem('token')) {
      auth_store.checkAuth()
    }
  }, [])

 

  //Пользователь не залогинен и ищет профиль
  if (!auth_store.isAuth) {
    return (
      <>
        <section className='profile-page-section'>
          <img className="profile-banner-img" src="https://media.rawg.io/media/screenshots/8ae/8aef4c14afbd1f927f6f4b10276b064a.jpg" alt="" />
          <div className="profile-banner">
            <div className='empty-block'></div>
            <div className="banner-text">
              <p className="profile-banner-name">{user_store.anotherUser.name} {user_store?.anotherUser?.surname}</p>
              <p className="other-banner-info">Подписчики {user_store.anotherUser.follower_count}</p>
              <p className="other-banner-info">Списки {user_store.anotherUser.list_count}</p>
              <p className="other-banner-info">Пройденные игры {user_store.anotherUser.passed_game_count}</p></div>
          </div>
        </section>
      </>
    )
  }
  //Пользователь не существует
  if (!user_store.anotherUser.username) {
    return (
      <div>Пользователь не найден</div>
    )
  }
  //Пользователь залогинен, но он на чужой странице
  if (auth_store.isAuth && auth_store.user.username !== user_store.anotherUser.username) {
    return (
      <>
        <section className='profile-page-section'>
          <img className="profile-banner-img" src="https://media.rawg.io/media/screenshots/8ae/8aef4c14afbd1f927f6f4b10276b064a.jpg" alt="" />
          <div className="profile-banner">
            <div className='empty-block'></div>
            <div className="banner-text">
              <p className="profile-banner-name">{user_store.anotherUser.name} {user_store?.anotherUser?.surname}</p>
              <p className="other-banner-info">Подписчики {user_store.anotherUser.follower_count}</p>
              <p className="other-banner-info">Списки {user_store.anotherUser.list_count}</p>
              <p className="other-banner-info">Пройденные игры {user_store.anotherUser.passed_game_count}</p></div>
            {user_store.isFollower ? <button onClick={unFollowHandler} className="profile-banner-button-unfollow">Отписаться</button> : <button onClick={followHandler} className="profile-banner-button-follow">Подписаться</button>}
          </div>
        </section>
      </>
    )
  }
  //Пользователь залогинен и он на своей странице
  return (
    <>
      <section className='profile-page-section'>
        <img className="profile-banner-img" src="https://media.rawg.io/media/screenshots/8ae/8aef4c14afbd1f927f6f4b10276b064a.jpg" alt="" />
        <div className="profile-banner">
          <div className='empty-block'></div>
          <div className="banner-text">
            <p className="profile-banner-name">{auth_store.user.name} {auth_store?.user?.surname}</p>
            <p className="other-banner-info">Подписчики {user_store.anotherUser.follower_count}</p>
            <p className="other-banner-info">Списки {user_store.anotherUser.list_count}</p>
            <p className="other-banner-info">Пройденные игры {user_store.anotherUser.passed_game_count}</p></div>

          <Link className="profile-banner-button-link" to='setting' reloadDocument><button className="profile-banner-button">Изменить профиль</button></Link>
        </div>

        <div className="main-lists-container">
          <Link to='liked'>
            <div className="list-card">
              <div className="card__image-container">
                <img
                  src='https://media.rawg.io/media/screenshots/8ae/8aef4c14afbd1f927f6f4b10276b064a.jpg'
                />
              </div>
            </div>
          </Link>
          <Link to='wants-to-play'>
            <div className="list-card">
              <div className="card__image-container">
                <img
                  src='https://media.rawg.io/media/screenshots/8ae/8aef4c14afbd1f927f6f4b10276b064a.jpg'
                />
              </div>
            </div>
          </Link>
          <Link to='played'>
            <div className="list-card">
              <div className="card__image-container">
                <img
                  src='https://media.rawg.io/media/screenshots/8ae/8aef4c14afbd1f927f6f4b10276b064a.jpg'
                />
              </div>
            </div>
          </Link>
          <Link to='lists'>
            <div className="list-card">
              <div className="card__image-container">
                <img
                  src='https://media.rawg.io/media/screenshots/8ae/8aef4c14afbd1f927f6f4b10276b064a.jpg'
                />
              </div>
            </div>
          </Link>

        </div>
        <div className="last-game-container">

        </div>
      </section>
    </>
  )

}

export default observer(ProfilePage);
