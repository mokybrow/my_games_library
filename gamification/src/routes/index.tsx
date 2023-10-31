import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from '../pages/MainPage';
import Header from '../components/header/header';
import GamesPage from '../pages/GamesPage';
import NewsPage from '../pages/NewsPage';
import ReviewsPage from '../pages/ReviewsPage';
import ListsPage from '../pages/ListsPage';


export const AppRoutes = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} >
            <Route path="/" element={<MainPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/lists" element={<ListsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}