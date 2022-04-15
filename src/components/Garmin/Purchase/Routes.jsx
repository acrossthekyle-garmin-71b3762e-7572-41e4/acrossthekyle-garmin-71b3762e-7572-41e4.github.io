import React from 'react';
import { Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { Choose } from './Choose';
import { Email } from './Email';
import { Checkout } from './Checkout';
import { Success } from './Success';
import { Error } from './Error';

export const PurchaseRoutes = () => {
  const clientId = (process.env.NODE_ENV === 'development' ? 'Abny9Qva83EbxXxthpqaTYHifJGptx73dZX6uWh-z8UDaF-xK8g5sPkSz59_YR4Bwy696QjpQ5-r5meb' : 'AfukE7xeOHI3Qh5RGage7d9BYnxG0NHw_WEq0H_aoTRfEDMjOdRVAj7EpoyVQfSaoDDDGBuqqV02jEUu');

  return (
    <Routes>
      <Route path="/" element={<Choose />} />
      <Route path="email" element={<Email />} />
      <Route
        path="checkout"
        element={
          <PayPalScriptProvider
            options={{
              'client-id': clientId,
              currency: 'USD',
              'disable-funding': ['card', 'credit', 'paylater']
            }}
          >
            <Checkout />
          </PayPalScriptProvider>
        }
      />
      <Route path="success" element={<Success />} />
      <Route path="error" element={<Error />} />
    </Routes>
  );
}
