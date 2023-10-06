import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthStore from './store/auth_store';
import UserStore from './store/user_store';
import GamesStore from './store/games_store';

interface State{
  auth_store: AuthStore
  user_store: UserStore
  games_store: GamesStore
}

const auth_store = new AuthStore();
const user_store = new UserStore();
const games_store = new GamesStore();

export const Context = createContext<State>({
  auth_store: auth_store,
  user_store: user_store,
  games_store: games_store,

})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{auth_store: auth_store, user_store: user_store, games_store: games_store}}>
    <App />
  </Context.Provider>
);
