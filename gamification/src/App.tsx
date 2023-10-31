import React, { useContext, useEffect } from 'react';
import { AppRoutes } from './routes';
import { Context } from '.';
import { getLocalToken } from './utils/utils';
import { useTheme } from './hooks/useTheme';

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
      <div>{auth_store.user.email}</div>
    </>
  );
}

export default App;
