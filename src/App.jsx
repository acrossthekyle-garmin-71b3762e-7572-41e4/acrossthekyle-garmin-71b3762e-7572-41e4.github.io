import 'animate.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import React from 'react';
import { Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import Home from './home';
import Garmin from './garmin';
import GarminHome from './garmin/Home';
import GarminApps from './garmin/Apps';
import GarminDonate from './garmin/Donate';
import GarminHelp from './garmin/Help';
import GarminPurchase from './garmin/Purchase';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/garmin" element={<Garmin />}>
        <Route index element={<GarminHome />} />
        <Route path="apps" element={<GarminApps />} />
        <Route path="purchase" element={
          <PayPalScriptProvider
            options={{
              'client-id': 'AfukE7xeOHI3Qh5RGage7d9BYnxG0NHw_WEq0H_aoTRfEDMjOdRVAj7EpoyVQfSaoDDDGBuqqV02jEUu',
              currency: 'USD',
              'disable-funding': ['card', 'credit', 'paylater']
            }}
          >
            <GarminPurchase />
          </PayPalScriptProvider>
        } />
        <Route path="donate" element={<GarminDonate />} />
        <Route path="help" element={<GarminHelp />} />
      </Route>
    </Routes>
  );
}

export default App;
