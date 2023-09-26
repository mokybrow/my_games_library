import { observer } from 'mobx-react-lite';
import { FC, useContext, useEffect } from 'react';
import { Context } from '..';
import { useNavigate, useParams } from 'react-router-dom';

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
    console.log('Kak by oizda', auth_store.user.username)
    return (
      <div>Пользователь не найден</div>
    )
  }
  if (auth_store.isAuth && auth_store.user.username !== user_store.anotherUser.username) {
    console.log('Kak by goida', auth_store.user.username)
    return (

      <>
        <div>{user_store.anotherUser.username}</div>
      </>
    )
  }
  console.log('Kak by da', auth_store.user.username)
  return (
    <>
      <button>Настройки жопы</button>
      <div>{auth_store.user.username}</div>
    </>
  )

}

export default observer(ProfilePage);
