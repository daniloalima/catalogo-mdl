// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MesaDetail from './pages/MesaDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mesa/:id" element={<MesaDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
