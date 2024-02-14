import './App.css';

import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import AddConfessionScreen from './pages/AddConfessionScreen';
import YourConfessionScreen from './pages/YourConfessionScreen';
import ProfileScreen from './pages/ProfileScreen';
import HomeScreen from './pages/HomeScreen';
import Header from './components/Header';
import BottemNavigation from './components/BottemNavigation';
import SignInScreen from './pages/SignInScreen';
import SignUpScreen from './pages/SignUpScreen';

function App() {
  return (
    <>
      <Router>
        <Header/>
      <BottemNavigation/>
        <Routes>
          <Route path="/" element={<HomeScreen/>}/>
          <Route path="/add" element={<AddConfessionScreen/>}/>
          <Route path="/your" element={<YourConfessionScreen/>}/>
          <Route path="/profile" element={<ProfileScreen/>}/>
          <Route path="/signin" element={<SignInScreen/>}/>
          <Route path="/signup" element={<SignUpScreen/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
