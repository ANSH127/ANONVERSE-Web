import './App.css';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppNavigation from './navigation/AppNavigation';
function App() {
  return (
    <>
      <Provider store={store}>
        <AppNavigation />

      </Provider>
    </>
  );
}

export default App;
