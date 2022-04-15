import { createRoot } from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux'

import store from './store'
import { App } from './components/App';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
  	<HashRouter>
      <App />
    </HashRouter>
  </Provider>
 );
