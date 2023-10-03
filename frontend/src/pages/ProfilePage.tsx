import { observer } from 'mobx-react-lite';
import { FC, useContext, useEffect } from 'react';
import { Context } from '..';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ProfilePage: FC = () => {
  const { auth_store } = useContext(Context);
  const { user_store } = useContext(Context);

  const { username } = useParams<string>();

  let navigate = useNavigate();

  useEffect(() => {
    user_store.FindUser(String(username))
    if (localStorage.getItem('token')) {
      auth_store.checkAuth()
    }
  }, [])

  if (!auth_store.isAuth) {
    return (
      <>{user_store.anotherUser.username}</>
    )
  }
  if (!user_store.anotherUser.username) {
    return (
      <div>Пользователь не найден</div>
    )
  }
  if (auth_store.isAuth && auth_store.user.username !== user_store.anotherUser.username) {
    return (

      <>
      <section className='profile-page-section'>
        <div className='back-banner'>
          <div className="banner">
          <div className="profile-img-container">
            <img src="https://media.rawg.io/media/screenshots/bcf/bcf0dcaccca70632bd312282246a0078.jpg" alt="" />
          </div>
            <p className='name-card'>{user_store.anotherUser.name} {user_store?.anotherUser?.surname}</p>
            <button className='edit-profile-button'>Изменить профиль</button>
          </div>


        </div>
        <div className="main-card">
          <Link className="list-card" to='wants-to-play'>
            <div className="list-card">
              <div className="card__image-container">
                <div className="card-body">
                </div>
              </div>
            </div>
          </Link>
          <Link className="list-card" to='played'>
            <div className="list-card">
              <div className="card__image-container">
                <div className="card-body">
                </div>
              </div>
            </div>
          </Link>
          <Link className="list-card" to='liked'>
            <div className="list-card">
              <div className="card__image-container">
                <div className="card-body">
                </div>
              </div>
            </div>
          </Link>
          <Link className="list-card" to='lists'>
            <div className="list-card">
              <div className="card__image-container">
                <div className="card-body">
                </div>
              </div>
            </div>
          </Link>
        </div>

      </section>
    </>
    )
  }
  return (
    <>
      <section className='profile-page-section'>
        <div className='back-banner'>
          <div className="banner">
            <p className='name-card'>{auth_store.user.name} {auth_store?.user?.surname}</p>
            <button className='edit-profile-button'>Изменить профиль</button>
          </div>
          <div className="profile-img-container">
            <img src="https://media.rawg.io/media/screenshots/bcf/bcf0dcaccca70632bd312282246a0078.jpg" alt="" />
          </div>

        </div>
        <div className="main-card">
          <Link className="list-card" to='wants-to-play'>
            <div className="list-card">
              <div className="card__image-container">
                <div className="card-body">
                </div>
              </div>
            </div>
          </Link>
          <Link className="list-card" to='played'>
            <div className="list-card">
              <div className="card__image-container">
                <div className="card-body">
                </div>
              </div>
            </div>
          </Link>
          <Link className="list-card" to='liked'>
            <div className="list-card">
              <div className="card__image-container">
                <div className="card-body">
                </div>
              </div>
            </div>
          </Link>
          <Link className="list-card" to='lists'>
            <div className="list-card">
              <div className="card__image-container">
                <div className="card-body">
                </div>
              </div>
            </div>
          </Link>
        </div>

      </section>
    </>
  )

}

export default observer(ProfilePage);
