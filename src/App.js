import './App.css';

import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
