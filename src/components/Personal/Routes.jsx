import React from 'react';
import { Routes, Route } from "react-router-dom";

import { Landing } from './Landing';

export const PersonalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
  );
}
