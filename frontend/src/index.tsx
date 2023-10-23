import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthStore from './store/auth_store';
import UserStore from './store/user_store';
import GamesStore from './store/games_store';
import { IntlProvider } from 'react-intl';
import Russian from './localization/ru.json';
import English from './localization/en.json';
import ListStore from './store/list_store';
import ReviewStore from './store/review_store';
import ArticleStore from './store/article_store';
import SearchStore from './store/search_store';


interface State {
  auth_store: AuthStore
  user_store: UserStore
  games_store: GamesStore
  list_store: ListStore
  review_store: ReviewStore
  artilce_store: ArticleStore
  search_store: SearchStore
}

const auth_store = new AuthStore();
const user_store = new UserStore();
const games_store = new GamesStore();
const list_store = new ListStore();
const review_store = new ReviewStore();
const artilce_store = new ArticleStore();
const search_store = new SearchStore();

export const Context = createContext<State>({
  auth_store: auth_store,
  user_store: user_store,
  games_store: games_store,
  list_store: list_store,
  review_store: review_store,
  artilce_store: artilce_store,
  search_store: search_store
})

const locale = navigator.language;

let lang;
if (locale === 'ru') {
  lang = Russian;
}
else {
  lang = English;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{ auth_store: auth_store, user_store: user_store, games_store: games_store, list_store: list_store, review_store: review_store, artilce_store: artilce_store, search_store: search_store }}>
    <IntlProvider locale={locale} messages={lang}>
      <App />
    </IntlProvider>

  </Context.Provider>

);
