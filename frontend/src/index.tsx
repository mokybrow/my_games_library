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


interface State {
  auth_store: AuthStore
  user_store: UserStore
  games_store: GamesStore
  list_store: ListStore
}

const auth_store = new AuthStore();
const user_store = new UserStore();
const games_store = new GamesStore();
const list_store = new ListStore();

export const Context = createContext<State>({
  auth_store: auth_store,
  user_store: user_store,
  games_store: games_store,
  list_store: list_store,
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
  <Context.Provider value={{ auth_store: auth_store, user_store: user_store, games_store: games_store, list_store: list_store }}>
    <IntlProvider locale={locale} messages={lang}>
      <App />
    </IntlProvider>

  </Context.Provider>

);
