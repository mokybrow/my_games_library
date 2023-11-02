import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthStore from './store/auth-store';
import UserStore from './store/user-store';
import ListStore from './store/list-store';
import GamesStore from './store/games-store';
import ArticleStore from './store/article-store';
import ReviewStore from './store/review-store';


interface State {
  auth_store: AuthStore
  user_store: UserStore
  list_store: ListStore
  games_store: GamesStore
  artilce_store: ArticleStore
  review_store: ReviewStore
}

const auth_store = new AuthStore();
const user_store = new UserStore();
const list_store = new ListStore();
const games_store = new GamesStore();
const artilce_store = new ArticleStore();
const review_store = new ReviewStore();

export const Context = createContext<State>({
  auth_store: auth_store,
  user_store: user_store,
  list_store: list_store,
  games_store: games_store,
  artilce_store: artilce_store,
  review_store: review_store,
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{
    auth_store: auth_store,
    user_store: user_store,
    list_store: list_store,
    games_store: games_store,
    artilce_store: artilce_store,
    review_store: review_store,
  }}>
    <App />
  </Context.Provider>
);