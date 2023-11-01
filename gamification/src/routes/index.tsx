import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from '../pages/MainPage';
import Header from '../components/header/header';
import GamesPage from '../pages/GamesPage';
import NewsPage from '../pages/NewsPage';
import ReviewsPage from '../pages/ReviewsPage';
import ListsPage from '../pages/listsPages/ListsPage';
import LoginPage from '../pages/authPages/LoginPage';
import RegistrationPage from '../pages/authPages/RegistrationPage';
import UserProfile from '../pages/UserProfile';
import FavoritePage from '../pages/listsPages/FavoritePage';
import WishlistPage from '../pages/listsPages/WishlistPage';
import CompletedPage from '../pages/listsPages/CompletedPage';


export const AppRoutes = () => {

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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/lists" element={<ListsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}