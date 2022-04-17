import React from 'react';
import { Navigate, Routes, Route } from "react-router-dom";

import { Container } from './Container';
import { Browse } from './Browse';
import { Help } from './Help';
import { Success } from './Success';
import { Error } from './Error';

export const GarminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Container />}>
        <Route index element={<Browse />} />
        <Route path="success" element={<Success />} />
        <Route path="error" element={<Error />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<Navigate replace to="/garmin" />} />
      </Route>
    </Routes>
  );
}
