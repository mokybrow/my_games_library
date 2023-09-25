import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react'
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import RegForm from '../components/RegForm';

const RegPage = () => {
  const { store } = useContext(Context);
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  if (store.isLoading) {
    return <div>Loading...</div>
  }
  if (store.isAuth) {
    navigate("/");
  } else {
    return (<RegForm />)
  }
  return <div></div>
}

export default observer(RegPage);