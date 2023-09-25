import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { Context } from '..';
import { useNavigate, useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { store } = useContext(Context);
  const { username } = useParams<string>();

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      // store.checkAuth()
      store.CheckMyProfile(String(username))
    }
  }, [])

  if (store.isLoading) {
    return <div>Loading...</div>
  }

  if (!store.anotherUser.username) {
    return (<>
      <div>USER DOESNT EXIST</div>
    </>)
  }

  if (store.user.username !== store.anotherUser.username) {
    return (
      <>{store.anotherUser.username}</>
    )
  }


  return (
    <>
     <button>Настройки жопы</button> 
      <div>{store.user.username}</div> 
    </>
  )
}

export default observer(ProfilePage);