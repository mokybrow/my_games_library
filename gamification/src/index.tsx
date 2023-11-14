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
import { IntlProvider } from 'react-intl';
import SearchStore from './store/search-store';
import { hydrate, render } from "react-dom";

const locale = navigator.language;


interface State {
  auth_store: AuthStore
  user_store: UserStore
  list_store: ListStore
  games_store: GamesStore
  artilce_store: ArticleStore
  review_store: ReviewStore
  search_store: SearchStore
}

const auth_store = new AuthStore();
const user_store = new UserStore();
const list_store = new ListStore();
const games_store = new GamesStore();
const artilce_store = new ArticleStore();
const review_store = new ReviewStore();
const search_store = new SearchStore();


export const Context = createContext<State>({
  auth_store: auth_store,
  user_store: user_store,
  list_store: list_store,
  games_store: games_store,
  artilce_store: artilce_store,
  review_store: review_store,
  search_store: search_store,
})

const rootElement = document.getElementById("root") as HTMLElement;
if (rootElement.hasChildNodes()) {
  hydrate(<Context.Provider value={{
    auth_store: auth_store,
    user_store: user_store,
    list_store: list_store,
    games_store: games_store,
    artilce_store: artilce_store,
    review_store: review_store,
    search_store: search_store
  }}>

    <IntlProvider locale={locale} >
      <App />
    </IntlProvider>

  </Context.Provider>, rootElement);
} else {
  render(<Context.Provider value={{
    auth_store: auth_store,
    user_store: user_store,
    list_store: list_store,
    games_store: games_store,
    artilce_store: artilce_store,
    review_store: review_store,
    search_store: search_store
  }}>

    <IntlProvider locale={locale} >
      <App />
    </IntlProvider>

  </Context.Provider>, rootElement);
}


// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );


// root.render(
//   <Context.Provider value={{
//     auth_store: auth_store,
//     user_store: user_store,
//     list_store: list_store,
//     games_store: games_store,
//     artilce_store: artilce_store,
//     review_store: review_store,
//     search_store: search_store
//   }}>

//     <IntlProvider locale={locale} >
//       <App />
//     </IntlProvider>

//   </Context.Provider>
// );
