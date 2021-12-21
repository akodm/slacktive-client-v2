import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';

export default function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </React.Fragment>
  );
}
