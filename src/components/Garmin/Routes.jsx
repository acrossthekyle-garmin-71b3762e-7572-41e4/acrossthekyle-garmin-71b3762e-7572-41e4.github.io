import React from 'react';
import { Routes, Route } from "react-router-dom";

import { PurchaseRoutes } from './Purchase/Routes';
import { Container } from './Container';
import { Landing } from './Landing';
import { Browse } from './Browse';
import { Donate } from './Donate';
import { Help } from './Help';
import { Manual } from './Manual';

export const GarminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Container />}>
        <Route index element={<Landing />} />
        <Route path="apps" element={<Browse />} />
        <Route path="donate" element={<Donate />} />
        <Route path="help" element={<Help />} />
        <Route path="manual" element={<Manual />} />
        <Route path="purchase/*" element={<PurchaseRoutes />} />
      </Route>
    </Routes>
  );
}
