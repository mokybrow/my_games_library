import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/header/header';
import GamesPage from '../pages/GamesPage';
import NewsPage from '../pages/NewsPage';
import ReviewsPage from '../pages/ReviewsPage';
import ListsPage from '../pages/listsPages/ListsPage';
import LoginPage from '../pages/authPages/LoginPage';
import RegistrationPage from '../pages/authPages/RegistrationPage';
import UserProfile from '../pages/userPages/UserProfile';
import FavoritePage from '../pages/listsPages/FavoritePage';
import WishlistPage from '../pages/listsPages/WishlistPage';
import CompletedPage from '../pages/listsPages/CompletedPage';
import UserSettings from '../pages/userPages/UserSettings';
import CreateListPage from '../pages/listsPages/CreateListPage';
import MainPage from '../pages/MainPage';
import AllListsPage from '../pages/AllListsPage';
import GamePage from '../pages/GamePage';
import ArticlePage from '../pages/ArticlePage';
import GameInLists from '../pages/listsPages/GameInLists';
import SearchPage from '../pages/SearchPage';
import CreateArticle from '../pages/CreateArticle';


const AppRoutes = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} >
            <Route path="/" element={<MainPage />} />

            <Route path="/:username" element={<UserProfile />} />
            <Route path="/:username/favorite" element={<FavoritePage />} />
            <Route path="/:username/wishlist" element={<WishlistPage />} />
            <Route path="/:username/completed" element={<CompletedPage />} />
            <Route path="/:username/lists" element={<ListsPage />} />
            <Route path="/:username/settings" element={<UserSettings />} />
            <Route path="/:username/lists/create" element={<CreateListPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />

            <Route path="/games" element={<GamesPage />} />
            <Route path="/game/:slug" element={<GamePage />} />
            <Route path="/lists" element={<AllListsPage />} />

            <Route path="/list/:slug" element={<GameInLists />} />

            <Route path="/news" element={<NewsPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/search" element={<SearchPage />} />

            <Route path="/article/:slug" element={<ArticlePage />} />
            <Route path="/article/create" element={<CreateArticle />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;