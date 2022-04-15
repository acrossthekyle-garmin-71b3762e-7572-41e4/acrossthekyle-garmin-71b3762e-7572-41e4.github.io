import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../resources/styles.css';

import React from 'react';
import { Routes, Route } from "react-router-dom";

import { GarminRoutes } from './Garmin/Routes';
import { PersonalRoutes } from './Personal/Routes';

const axios = require('axios').default;

export const App = () => {
  axios.defaults.baseURL = (process.env.NODE_ENV === 'development' ? 'http://localhost' : 'https://api.acrossthekyle.com');

  return (
    <Routes>
      <Route path="*" element={<PersonalRoutes />} />
      <Route path="/garmin/*" element={<GarminRoutes />} />
    </Routes>
  );
}
