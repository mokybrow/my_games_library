import { observer } from 'mobx-react-lite';
import { FC, useContext, useEffect } from 'react'
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import RegForm from '../components/RegForm';

const RegPage: FC = () => {
  const { auth_store } = useContext(Context);
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      auth_store.checkAuth()
    }
  }, [])

  if (auth_store.isLoading) {
    return <div>Loading...</div>
  }
  if (auth_store.isAuth) {
    navigate("/");
  } else {
    return (<RegForm />)
  }
  return <div></div>
}

export default observer(RegPage);