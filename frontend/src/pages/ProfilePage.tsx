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

  if (user_store.isLoading === true || auth_store.isLoading == true) {
    return (
      <section className='loader-section'>
        <div className="lds-spinner"><div></div>
          <div></div><div></div>
          <div></div><div></div><div>
          </div><div></div><div></div><div
          ></div><div></div><div></div>
          <div></div></div>
      </section>

    )
  }

  //Пользователь не залогинен и ищет профиль
  if (!auth_store.isAuth) {
    return (
      <>
        <section className='profile-page-section'>
          <div className="profile-banner-with-cover">
            <div className="user-profile-cover-container">
              {auth_store.user.img == null || auth_store.user.img == '' ? <img src={require('../icons/user.png')} /> : <img src={user_store.anotherUser.img} />}
            </div>
            <div className="user-name-container">
              <h1 className="profile-banner-name">{user_store.anotherUser.name} {user_store?.anotherUser?.surname}</h1>
              <div className='user-follower-bolock'>
                <span>Подписчиков </span>
                <span>{user_store.anotherUser.follower_count}</span>
              </div>
            </div>
          </div>

          <div className="profile-banner-with-statat">
            <div className="user-stat-container">
              <div className="user-metric-container">
                <span className="user-metric-container-count">{user_store.anotherUser.passed_game_count}</span><span className="other-banner-info">Пройденно</span>
              </div>
              <div className="user-metric-container">
                <span className="user-metric-container-count">{user_store.anotherUser.wanted_game_count}</span><span className="other-banner-info">Пройдёт</span>
              </div>
              <div className="user-metric-container">
                <span className="user-metric-container-count">{user_store.anotherUser.list_count}</span><span className="other-banner-info">Списки</span>
              </div>
            </div>
          </div>

          <div className="profile-banner-with-buttons">
            <div className="buttons-container">
              {!auth_store.isAuth ? <Link to='/login' reloadDocument> <button className="profile-banner-button-follow" >Подписаться</button> </Link> : user_store.isFollower ? <button onClick={unFollowHandler} className="profile-banner-button-unfollow">Отписаться</button> : <button onClick={followHandler} className="profile-banner-button-follow">Подписаться</button>}

            </div>
          </div>

          <div className="main-lists-container">
            <Link to='liked'>
              <div className="profile-card-cover-container">
                <img src={require('../icons/user.png')} />

              </div>
            </Link>
            <Link to='wants-to-play'>
              <div className="profile-card-cover-container">
                <img src={require('../icons/user.png')} />

              </div>
            </Link>
            <Link to='played'>
              <div className="profile-card-cover-container">
                <img src={require('../icons/user.png')} />

              </div>
            </Link>
            <Link to='lists'>
              <div className="profile-card-cover-container">
                <img src={require('../icons/user.png')} />

              </div>
            </Link>

          </div>
          <div className="last-game-container">
            <h2 className='profile-container-header'>Последние игры</h2>
            {user_store.games.length > 0 ?
              <>
                {user_store.games.map((game) =>
                  <Link key={game.id} to={'/game/' + game.slug}>
                    <div className="profile-card-cover-container">
                      <img src={game.cover} />
                      <div className="title-card-body-profile">
                        <div className="title-card">
                          <span className="card-title">{game.title}</span>
                        </div>
                      </div>
                    </div>

                  </Link>)}
              </> :
              <div className="empty-container">
                <div className="games-card-placeholder"><h2>Тут пусто, даже слишком</h2></div>
              </div>
            }
          </div>

          <div className="last-reviews-container">
            <h2 className='profile-container-header'>Последние отзывы</h2>
            {user_store.reviews.length > 0 ?
              <>
                {user_store.reviews.map(review =>
                  <Link key={review.slug} to={'/game/' + review.slug}>
                    <div className="profile-card-cover-container">
                      <img src={review.cover} />
                      <div className="title-card-body-rate">
                        <div className="title-card">
                          <span className="card-title-grade">{review.grade}</span>
                        </div>
                      </div>
                    </div>
                  </Link>)}
              </> :
              <div className="empty-container">
                <div className="games-card-placeholder"><h2>Тут пусто, даже слишком</h2></div>
              </div>
            }
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
          <div className="profile-banner-with-cover">
            <div className="user-profile-cover-container">
              {auth_store.user.img == null || auth_store.user.img == '' ? <img src={require('../icons/user.png')} /> : <img src={user_store.anotherUser.img} />}
            </div>
            <div className="user-name-container">
              <h1 className="profile-banner-name">{user_store.anotherUser.name} {user_store?.anotherUser?.surname}</h1>
              <div className='user-follower-bolock'>
                <span>Подписчиков </span>
                <span>{user_store.anotherUser.follower_count}</span>
              </div>
            </div>
          </div>

          <div className="profile-banner-with-statat">
            <div className="user-stat-container">
              <div className="user-metric-container">
                <span className="user-metric-container-count">{user_store.anotherUser.passed_game_count}</span><span className="other-banner-info">Пройденно</span>
              </div>
              <div className="user-metric-container">
                <span className="user-metric-container-count">{user_store.anotherUser.wanted_game_count}</span><span className="other-banner-info">Пройдёт</span>
              </div>
              <div className="user-metric-container">
                <span className="user-metric-container-count">{user_store.anotherUser.list_count}</span><span className="other-banner-info">Списки</span>
              </div>
            </div>
          </div>

          <div className="profile-banner-with-buttons">
            <div className="buttons-container">
              {user_store.isFollower ? <button onClick={unFollowHandler} className="profile-banner-button-unfollow">Отписаться</button> : <button onClick={followHandler} className="profile-banner-button-follow">Подписаться</button>}

            </div>
          </div>

          <div className="main-lists-container">
            <Link to='liked'>
              <div className="profile-card-cover-container">
                <img src={require('../icons/user.png')} />

              </div>
            </Link>
            <Link to='wants-to-play'>
              <div className="profile-card-cover-container">
                <img src={require('../icons/user.png')} />

              </div>
            </Link>
            <Link to='played'>
              <div className="profile-card-cover-container">
                <img src={require('../icons/user.png')} />

              </div>
            </Link>
            <Link to='lists'>
              <div className="profile-card-cover-container">
                <img src={require('../icons/user.png')} />

              </div>
            </Link>

          </div>
          <div className="last-game-container">
            <h2 className='profile-container-header'>Последние игры</h2>
            {user_store.games.length > 0 ?
              <>
                {user_store.games.map((game) =>
                  <Link key={game.id} to={'/game/' + game.slug}>
                    <div className="profile-card-cover-container">
                      <img src={game.cover} />
                      <div className="title-card-body-profile">
                        <div className="title-card">
                          <span className="card-title">{game.title}</span>
                        </div>
                      </div>
                    </div>

                  </Link>)}
              </> :
              <div className="empty-container">
                <div className="games-card-placeholder"><h2>Тут пусто, даже слишком</h2></div>
              </div>
            }
          </div>

          <div className="last-reviews-container">
            <h2 className='profile-container-header'>Последние отзывы</h2>
            {user_store.reviews.length > 0 ?
              <>
                {user_store.reviews.map(review =>
                  <Link key={review.slug} to={'/game/' + review.slug}>
                    <div className="profile-card-cover-container">
                      <img src={review.cover} />
                      <div className="title-card-body-rate">
                        <div className="title-card">
                          <span className="card-title-grade">{review.grade}</span>
                        </div>
                      </div>
                    </div>
                  </Link>)}
              </> :
              <div className="empty-container">
                <div className="games-card-placeholder"><h2>Тут пусто, даже слишком</h2></div>
              </div>
            }
          </div>

        </section>

      </>
    )
  }
  //Пользователь залогинен и он на своей странице
  return (
    <>
      <section className='profile-page-section'>
        <div className="profile-banner-with-cover">
          <div className="user-profile-cover-container">
            {auth_store.user.img == null || auth_store.user.img == '' ? <img src={require('../icons/user.png')} /> : <img src={auth_store.user.img} />}
          </div>
          <div className="user-name-container">
            <h1 className="profile-banner-name">{auth_store.user.name} {auth_store?.user?.surname}</h1>
            <div className='user-follower-bolock'>
              <span>Подписчиков </span>
              <span>{auth_store.user.follower_count}</span>
            </div>
          </div>
        </div>

        <div className="profile-banner-with-statat">
          <div className="user-stat-container">
            <div className="user-metric-container">
              <span className="user-metric-container-count">{auth_store.user.passed_game_count}</span><span className="other-banner-info">Пройденно</span>
            </div>
            <div className="user-metric-container">
              <span className="user-metric-container-count">{auth_store.user.wanted_game_count}</span><span className="other-banner-info">Пройдёт</span>
            </div>
            <div className="user-metric-container">
              <span className="user-metric-container-count">{auth_store.user.list_count}</span><span className="other-banner-info">Списки</span>
            </div>
          </div>
        </div>

        <div className="profile-banner-with-buttons">
          <div className="buttons-container">
            <Link className="profile-banner-button-link" to='setting' reloadDocument><button className="profile-banner-button">Изменить профиль</button></Link>
            <Link className="profile-banner-button-link" to='list/create/' reloadDocument><button className="profile-banner-button">Создать список</button></Link>
          </div>
        </div>

        <div className="main-lists-container">
          <Link to='liked'>
            <div className="profile-card-cover-container">
              <img src={require('../icons/user.png')} />

            </div>
          </Link>
          <Link to='wants-to-play'>
            <div className="profile-card-cover-container">
              <img src={require('../icons/user.png')} />

            </div>


          </Link>
          <Link to='played'>
            <div className="profile-card-cover-container">
              <img src={require('../icons/user.png')} />

            </div>
          </Link>
          <Link to='lists'>
            <div className="profile-card-cover-container">
              <img src={require('../icons/user.png')} />

            </div>
          </Link>

        </div>
        <div className="last-game-container">
          <h2 className='profile-container-header'>Последние игры</h2>
          {auth_store.games.length > 0 ?
            <>
              {auth_store.games.map((game) =>
                <Link key={game.id} to={'/game/' + game.slug}>
                  <div className="profile-card-cover-container">
                    <img src={game.cover} />
                    <div className="title-card-body-profile">
                      <div className="title-card">
                        <span className="card-title">{game.title}</span>
                      </div>
                    </div>
                  </div>

                </Link>)}
            </> :
            <div className="empty-container">
              <div className="games-card-placeholder"><h2>Тут пусто, даже слишком</h2></div>
            </div>
          }
        </div>

        <div className="last-reviews-container">
          <h2 className='profile-container-header'>Последние отзывы</h2>
          {auth_store.reviews.length > 0 ?
            <>
              {auth_store.reviews.map(review =>
                <Link key={review.slug} to={'/game/' + review.slug}>
                  <div className="profile-card-cover-container">
                    <img src={review.cover} />
                    <div className="title-card-body-rate">
                      <div className="title-card">
                        <span className="card-title-grade">{review.grade}</span>
                      </div>
                    </div>
                  </div>
                </Link>)}
            </> :
            <div className="empty-container">
              <div className="games-card-placeholder"><h2>Тут пусто, даже слишком</h2></div>
            </div>
          }
        </div>

      </section>
    </>
  )

}

export default observer(ProfilePage);
