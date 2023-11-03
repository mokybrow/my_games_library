import React, { useContext, useEffect } from 'react';
import { Context } from '.';
import { getLocalToken } from './utils/utils';
import { useTheme } from './hooks/useTheme';
import { observer } from 'mobx-react-lite';
import AppRoutes from './routes/index'

function App() {
  const { auth_store } = useContext(Context);
  const { theme, setTheme } = useTheme()
  
  useEffect(() => {
    if (getLocalToken()) {
      auth_store.checkAuth()
    }
  }, [auth_store])



  return (
    <>
      <AppRoutes />
    </>
  );
}

export default observer(App);

