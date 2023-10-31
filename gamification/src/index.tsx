import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthStore from './store/auth-store';


interface State {
  auth_store: AuthStore
}

const auth_store = new AuthStore();

export const Context = createContext<State>({
  auth_store: auth_store,
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{ auth_store: auth_store }}>
      <App />
  </Context.Provider>
);
