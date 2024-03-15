import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddConfessionScreen from '../pages/AddConfessionScreen';
import YourConfessionScreen from '../pages/YourConfessionScreen';
import ProfileScreen from '../pages/ProfileScreen';
import HomeScreen from '../pages/HomeScreen';
import Header from '../components/Header';
import BottemNavigation from '../components/BottemNavigation';
import SignInScreen from '../pages/SignInScreen';
import SignUpScreen from '../pages/SignUpScreen';
import UserProfileScreen from '../pages/UserProfileScreen';
import SearchSection from '../components/SearchSection';
import TrendingCards from '../components/TrendingCards';
import ProfileCard from '../components/ProfileCard';
import NavCard from '../components/NavCard';
import { theme } from '../theme';
import { useSelector } from 'react-redux'



import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AppNavigation() {
    const mode=useSelector(state=>state.user.theme)
  return (
    
    <Router>
    <Header />
    <BottemNavigation />

    <div className={`grid-cols-1 grid md:grid-cols-4 gap-8 m-0 h-full p-4  fixed w-full ${mode?theme.black:theme.white}`} style={{ height: '100%' }}>
      <div className='hidden md:block gap-4 col-span-1'>
        <ProfileCard />
        <NavCard />
      </div>

      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/addconfession" element={<AddConfessionScreen />} />
        <Route path="/yourconfession" element={<YourConfessionScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/login" element={<SignInScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/profile/:uid" element={<UserProfileScreen />} />
      </Routes>

      <div className='mr-2 hidden md:block'>

        <SearchSection />
        <TrendingCards />
      </div>
      <ToastContainer theme={`${mode?'dark':'light'}`}  />
    </div>
  </Router>
  )
}
