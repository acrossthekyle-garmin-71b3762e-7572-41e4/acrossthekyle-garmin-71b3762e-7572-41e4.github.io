import 'animate.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from './home';
import Garmin from './garmin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/garmin" element={<Garmin />} />
    </Routes>
  );
}

export default App;
