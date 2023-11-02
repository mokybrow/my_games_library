import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthStore from './store/auth-store';
import UserStore from './store/user-store';
import ListStore from './store/list-store';


interface State {
  auth_store: AuthStore
  user_store: UserStore
  list_store: ListStore
}

const auth_store = new AuthStore();
const user_store = new UserStore();
const list_store = new ListStore();

export const Context = createContext<State>({
  auth_store: auth_store,
  user_store: user_store,
  list_store: list_store,
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{ auth_store: auth_store, user_store: user_store, list_store: list_store }}>
      <App />
  </Context.Provider>
);
