import React, { useContext, useEffect } from 'react';
import { Context } from '.';
import { getLocalToken } from './utils/utils';
import { useTheme } from './hooks/useTheme';
import { observer } from 'mobx-react-lite';
import AppRoutes from './routes/index'
import Footer from './components/footer/footer';
import { BrowserRouter } from 'react-router-dom'

function App() {
  const { auth_store } = useContext(Context);
  const { artilce_store } = useContext(Context);
  const { list_store } = useContext(Context);
  const { games_store } = useContext(Context);
  const { review_store } = useContext(Context);
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (getLocalToken()) {
      auth_store.checkAuth()
    }
  }, [auth_store, artilce_store, review_store, games_store, list_store])


  return (
    <>
        <AppRoutes />

    </>
  );
}

export default observer(App);

