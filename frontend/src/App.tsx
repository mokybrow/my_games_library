import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegPage from './pages/RegPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import { PlaylistsPage } from './pages/PlaylistsPage';
import { NewsPage } from './pages/NewsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import './styles/form.css'
import './styles/home-page.css'
import './styles/profile-page.css'
import './styles/reg-page.css'
import './styles/page-loader.css'
import './styles/game-profile.css'
import './styles/games-page.css'
import './styles/pagination.css'
import './styles/admin-page.css'
import './styles/user-settings.css'
import './styles/list-create.css'
import './styles/lists-pages.css'
import GameProfile from './pages/GameProfile';
import GamesPage from './pages/GamesPage';
import AdminPage from './pages/AdminPage';
import AdminUsers from './pages/AdminUsers';
import UserSettings from './pages/UserSettings';
import ListCreate from './pages/ListCreate';
import UserListsPage from './pages/UserListsPage';
import GameInUserList from './pages/GameInUserList';
import PlayedGamesPage from './pages/PlayedGamesPage';
import LikedGamesPage from './pages/LikedGamesPage';
import WantPlayGamePage from './pages/WantPlayGamePage';



function App() {
  // const { auth_store } = useContext(Context);
  // const { theme, setTheme } = useTheme()
  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     auth_store.checkAuth()
  //   }
  // }, [auth_store])

    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signup' element={<RegPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/:username' element={<ProfilePage />} />
            <Route path='/games' element={<GamesPage />} />
            <Route path='/playlists/' element={<PlaylistsPage />} />
            <Route path='/news/' element={<NewsPage />} />
            <Route path='/reviews/' element={<ReviewsPage />} />
            <Route path='/game/:slug' element={<GameProfile />} />
            <Route path='/list/:slug' element={<GameInUserList />} />
            <Route path='/:username/settings' element={<UserSettings />} />
            <Route path='/:username/list/create' element={<ListCreate />} />
            <Route path='/:username/lists' element={<UserListsPage />} />
            <Route path='/:username/played' element={<PlayedGamesPage />} />
            <Route path='/:username/liked' element={<LikedGamesPage />} />
            <Route path='/:username/wants-to-play' element={<WantPlayGamePage />} />
            <Route path='/dash/admin' element={<AdminPage />} />
            <Route path='/dash/admin/users' element={<AdminUsers />} />
          </Routes>
        </Router>
      </>
    );

}

export default App;
