// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MesaDetail from './pages/MesaDetails';
import Catalogo from './pages/Catalogo';
import Login from './pages/Login';
import AdicionarMesa from './pages/AdicionarMesa';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catalog" element={<Catalogo />} />
        <Route path="/catalog/add" element={<AdicionarMesa />} />
        <Route path="/mesa/:id" element={<MesaDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
