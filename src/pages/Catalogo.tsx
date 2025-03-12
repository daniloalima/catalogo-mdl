// src/pages/Catalogo.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MesaCard from "../components/MesaCard";
import { Mesa } from "../types/Mesa";
import api from "../api/api";

const Catalogo: React.FC = () => {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filtroDia, setFiltroDia] = useState<string>("");
  const [filtroVagas, setFiltroVagas] = useState<string>("");
  const isAdmin = localStorage.getItem("is_admin") === "true";
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/mesas")
      .then((res) => {
        if (res.status === 200) {
          setMesas(res.data.mesas);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar mesas:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleFiltroDiaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltroDia(e.target.value);
  };

  const handleFiltroVagasChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltroVagas(e.target.value);
  };

  const mesasFiltradas = mesas.filter((mesa) => {
    return (
      (filtroDia ? mesa.dia === filtroDia : true) &&
      (filtroVagas === "com-vagas" ? mesa.vagas > 0 : filtroVagas === "sem-vagas" ? mesa.vagas === 0 : true)
    );
  });

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-custom-gradient">
        <p className="text-white text-2xl">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-custom-gradient">
      <div className="container mx-auto py-10">
        <Link to="/" className="text-white mb-4 inline-block hover:underline">
          ← Voltar para Home
        </Link>
        <h1 className="text-4xl font-extrabold text-center text-white mb-10">
          Catálogo de Mesas
        </h1>

        {isAdmin && (
          <div className="mb-8">
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-transform transform hover:scale-105 shadow-lg"
              onClick={() => navigate("/catalog/add")}
            >
              Adicionar Mesa
            </button>
          </div>
        )}

        <div className="mb-8 flex space-x-4">
          <div>
            <label className="block text-white mb-2">Filtrar por Dia da Semana:</label>
            <select
              value={filtroDia}
              onChange={handleFiltroDiaChange}
              className="w-full border border-gray-300 text-black-800 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 bg-custom-gradient"
            >
              <option value="">Todos os Dias</option>
              <option value="Segunda-feira">Segunda-feira</option>
              <option value="Terça-feira">Terça-feira</option>
              <option value="Quarta-feira">Quarta-feira</option>
              <option value="Quinta-feira">Quinta-feira</option>
              <option value="Sexta-feira">Sexta-feira</option>
              <option value="Sábado">Sábado</option>
              <option value="Domingo">Domingo</option>
            </select>
          </div>
          <div>
            <label className="block text-white mb-2">Filtrar por Vagas:</label>
            <select
              value={filtroVagas}
              onChange={handleFiltroVagasChange}
              className="w-full border border-gray-300 text-black-800 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 bg-custom-gradient"
            >
              <option value="">Todas as Mesas</option>
              <option value="com-vagas">Com Vagas</option>
              <option value="sem-vagas">Sem Vagas</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mesasFiltradas.map((mesa) => (
            <MesaCard
              key={mesa.id}
              id={mesa.id}
              nome={mesa.name} // adaptamos para a propriedade "name"
              sistema={mesa.sistema}
              dia={mesa.dia}
              horario={mesa.horario}
              vagas={mesa.vagas}
              mesa_especial={mesa.mesa_especial}
              // Usando uma imagem placeholder com o nome da mesa como parâmetro
              imagem={
                mesa.image_url ||
                `https://placehold.co/400x300?text=${encodeURIComponent(
                  mesa.name
                )}`
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalogo;
