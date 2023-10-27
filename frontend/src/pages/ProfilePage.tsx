import { observer } from 'mobx-react-lite';
import { FC, useContext, useEffect, useState } from 'react';
import { Context } from '..';
import { Link, useParams } from 'react-router-dom';
import UserService from '../service/UserService';
import { FormattedMessage } from 'react-intl';

const ProfilePage: FC = () => {
  const { auth_store } = useContext(Context);
  const { user_store } = useContext(Context);
  const { username } = useParams<string>();

  useEffect(() => {
    const checkUsername = async () => {
      const response = await auth_store.checkAuth()

      return response
    }
    checkUsername().then(function (value: any) {
      if (value !== String(username)) {
        user_store.findUser(String(username),0, 6)

      } else {
        auth_store.getMyProfileFunc(0, 6)
      }
    })

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

  //Пользователь не существует
  if (auth_store.user.username != username && !user_store.user.username) {
    return (
      <div>Пользователь не найден</div>
    )
  }
  //Пользователь залогинен, но он на чужой странице
  if ((auth_store.isAuth && auth_store.user.username !== username) || (!auth_store.isAuth)) {
    return (
      <>
        <section className='profile-page-section'>
          <div className="profile-banner-with-cover">
            <div className="user-profile-cover-container">

              {user_store.user.img == null || user_store.user.img == '' ? <img src={require('../icons/user.png')} width={100} height={100} /> : <img src={"data:image/jpeg;base64," + user_store.user.img} width={100} height={100} />
              }
            </div>
            <div className="user-name-container">
              <h1 className="profile-banner-name">{user_store.user.name} {user_store?.user?.surname}</h1>
              <div className='user-follower-bolock'>
                <span>
                  <FormattedMessage id="content.userprofile.followers" />
                </span>&nbsp;
                <span>{user_store.user.follower_count}</span>
              </div>
            </div>
          </div>

          <div className="profile-banner-with-statat">
            <div className="user-stat-container">
              <div className="user-metric-container">
                <span className="user-metric-container-count">{user_store.user.passed_game_count}</span><span className="other-banner-info"><FormattedMessage id="content.userprofile.passed" /></span>
              </div>
              <div className="user-metric-container">
                <span className="user-metric-container-count">{user_store.user.wanted_game_count}</span><span className="other-banner-info"><FormattedMessage id="content.userprofile.wanted" /></span>
              </div>
              <div className="user-metric-container">
                <span className="user-metric-container-count">{user_store.user.list_count}</span><span className="other-banner-info"><FormattedMessage id="content.userprofile.lists" /></span>
              </div>
            </div>
          </div>

          <div className="profile-banner-with-buttons">
            <div className="buttons-container">
              {auth_store.isAuth ? <>
                {
                  user_store.isFollower ? <button onClick={() => user_store.followController(String(username))} className="profile-banner-button-unfollow">
                    <FormattedMessage id="content.userprofile.unfollow" />
                  </button> : <button onClick={() => user_store.followController(String(username))} className="profile-banner-button-follow"><FormattedMessage id="content.userprofile.follow" />
                  </button>
                }</>
                : <Link to='/login' reloadDocument>
                  <button className="profile-banner-button-follow" >
                    <FormattedMessage id="content.userprofile.follow" />
                  </button> </Link>}

            </div>
          </div>

          <div className="main-lists-container">
            <Link to='played?page=1'>
              <div className="main-profile-card-cover-container">
                <img src={require('../icons/passed-cover.png')} />
              </div>
            </Link>

            <Link to='liked?page=1'>
              <div className="main-profile-card-cover-container">
                <img src={require('../icons/like-cover.png')} />
              </div>
            </Link>
            <Link to='wants-to-play?page=1'>
              <div className="main-profile-card-cover-container">
                <img src={require('../icons/want-cover.png')} />
              </div>
            </Link>
            <Link to='lists?page=1'>
              <div className="main-profile-card-cover-container">
                <img src={require('../icons/user.png')} />

              </div>
            </Link>

          </div>
          <div className="last-game-container">
            <h2 className='profile-container-header'><FormattedMessage id="content.userprofile.activity" /> </h2>
            {user_store.userActivity.length > 0 ?
              <>
                {user_store.userActivity.map((game) =>
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
              <div className="error-card-container">
                <h2><FormattedMessage id="content.userprofile.inactive" /></h2>
              </div>
            }
          </div>

          <div className="last-reviews-container">
            <h2 className='profile-container-header'><FormattedMessage id="content.userprofile.lastreviews" /> </h2>
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
              <div className="error-card-container">
                <h2><FormattedMessage id="content.userprofile.inactive" /></h2>
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

            {auth_store.user.img == null || auth_store.user.img == '' ? <img src={require('../icons/user.png')} /> : <img src={`data:image/jpeg;base64,${auth_store.user.img}`} width={100} height={100} />}
          </div>
          <div className="user-name-container">
            <h1 className="profile-banner-name">{auth_store.user.name} {auth_store?.user?.surname}</h1>
            <div className='user-follower-bolock'>
              <span><FormattedMessage id="content.userprofile.followers" /> </span>&nbsp;
              <span>{auth_store.user.follower_count}</span>
            </div>
          </div>
        </div>

        <div className="profile-banner-with-statat">
          <div className="user-stat-container">
            <div className="user-metric-container">
              <span className="user-metric-container-count">{auth_store.user.passed_game_count}</span><span className="other-banner-info"><FormattedMessage id="content.userprofile.passed" /></span>
            </div>
            <div className="user-metric-container">
              <span className="user-metric-container-count">{auth_store.user.wanted_game_count}</span><span className="other-banner-info"><FormattedMessage id="content.userprofile.wanted" /></span>
            </div>
            <div className="user-metric-container">
              <span className="user-metric-container-count">{auth_store.user.list_count}</span><span className="other-banner-info"><FormattedMessage id="content.userprofile.lists" /></span>
            </div>
          </div>
        </div>

        <div className="profile-banner-with-buttons">
          <div className="buttons-container">
            <Link className="profile-banner-button-link" to='settings' reloadDocument><button className="profile-banner-button"><FormattedMessage id="content.userprofile.settings" /></button></Link>
            <Link className="profile-banner-button-link" to='list/create/' reloadDocument><button className="profile-banner-button"><FormattedMessage id="content.userprofile.createlist" /></button></Link>
          </div>
        </div>
        <div className="main-lists-container">
          <Link to='played?page=1'>
            <div className="main-profile-card-cover-container">
              <img src={require('../icons/passed-cover.png')} />
            </div>
          </Link>

          <Link to='liked?page=1'>
            <div className="main-profile-card-cover-container">
              <img src={require('../icons/like-cover.png')} />
            </div>
          </Link>
          <Link to='wants-to-play?page=1'>
            <div className="main-profile-card-cover-container">
              <img src={require('../icons/want-cover.png')} />
            </div>
          </Link>
          <Link to='lists'>
            <div className="main-profile-card-cover-container">
              <img src={require('../icons/user.png')} />

            </div>
          </Link>

        </div>
        <div className="last-game-container">
          <h2 className='profile-container-header'><FormattedMessage id="content.userprofile.activity" /></h2>
          {auth_store.userActivity.length > 0 ?
            <>
              {auth_store.userActivity.map((game) =>
                <Link key={game.id} to={'/game/' + game.slug}>
                  <div className="profile-card-cover-container">
                    <img src={game.cover} />
                    <div className="title-card-body-profile">
                      <div className="title-card">
                        <span className="card-title">{game.title}</span>

                      </div>
                      <div className="title-card-activity">

                        <span className="card-title-activity">
                          {game.activity_type == 'passed' ? <FormattedMessage id="content.userprofile.passed" /> :
                            game.activity_type == 'liked' ? <FormattedMessage id="content.userprofile.liked" /> :
                              <FormattedMessage id="content.userprofile.wanted" />}
                        </span>
                      </div>

                    </div>
                  </div>

                </Link>)}
            </> :
            <div className="error-card-container">
              <h2><FormattedMessage id="content.userprofile.inactive" /></h2>
            </div>
          }
        </div>

        <div className="last-reviews-container">
          <h2 className='profile-container-header'><FormattedMessage id="content.userprofile.lastreviews" /></h2>
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
            <div className="error-card-container">
              <h2><FormattedMessage id="content.userprofile.inactive" /></h2>
            </div>

          }
        </div>

      </section>
    </>
  )

}

export default observer(ProfilePage);
