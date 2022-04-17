import React from 'react';
import { Navigate, Routes, Route } from "react-router-dom";

import { Landing } from './Landing';

export const PersonalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
