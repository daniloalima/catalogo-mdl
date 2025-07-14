// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import MesaDetail from './pages/MesaDetails';
import Catalogo from './pages/Catalogo';
import Login from './pages/Login';
import AdicionarMesa from './pages/AdicionarMesa';
import EditarMesa from './pages/EditarMesa';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catalog" element={<Catalogo />} />
        <Route path="/catalog/" element={<Catalogo/>} />
        <Route path="/catalog/add" element={<AdicionarMesa />} />
        <Route path="/mesa/:id" element={<MesaDetail />} />
        <Route path="/mesa/:id/edit" element={<EditarMesa />} />
      </Routes>
    </Router>
  );
};

export default App;
