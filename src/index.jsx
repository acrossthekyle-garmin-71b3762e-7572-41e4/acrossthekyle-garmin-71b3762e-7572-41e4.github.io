import { createRoot } from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux'

import store from './store'
import App from './App';

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <Provider store={store}>
  	<HashRouter>
      <App />
    </HashRouter>
  </Provider>
 );
