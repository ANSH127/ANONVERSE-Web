import './App.css';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppNavigation from './nav/AppNavigation';
import { Analytics } from "@vercel/analytics/react"
function App() {
  return (
    <>
      <Provider store={store}>
        <AppNavigation />
        <Analytics/>

      </Provider>
    </>
  );
}

export default App;
