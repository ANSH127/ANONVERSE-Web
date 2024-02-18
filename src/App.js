import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddConfessionScreen from './pages/AddConfessionScreen';
import YourConfessionScreen from './pages/YourConfessionScreen';
import ProfileScreen from './pages/ProfileScreen';
import HomeScreen from './pages/HomeScreen';
import Header from './components/Header';
import BottemNavigation from './components/BottemNavigation';
import SignInScreen from './pages/SignInScreen';
import SignUpScreen from './pages/SignUpScreen';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import SearchSection from './components/SearchSection';
import TrendingCards from './components/TrendingCards';
import ProfileCard from './components/ProfileCard';
import NavCard from './components/NavCard';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <Provider store={store}>

        <Router>
          <Header />
          <BottemNavigation />

          <div className='grid-cols-1 grid md:grid-cols-4 gap-8  h-full p-4 m-2 fixed w-full' style={{ height: '100%' }}>
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
            </Routes>

            <div className='mr-2 hidden md:block'>

              <SearchSection />
              <TrendingCards />
            </div>
            <ToastContainer />
          </div>
        </Router>
      </Provider>
    </>
  );
}

export default App;
