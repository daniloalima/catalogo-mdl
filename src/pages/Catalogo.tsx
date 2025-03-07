// src/pages/Catalogo.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MesaCard from "../components/MesaCard";
import { Mesa } from "../types/Mesa";

const Catalogo: React.FC = () => {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isAdmin = localStorage.getItem("is_admin") === "true";
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/mesas")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setMesas(data.mesas);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar mesas:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-custom-gradient">
        <p className="text-white text-2xl">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-custom-gradient">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mesas.map((mesa) => (
            <MesaCard
              key={mesa.id}
              id={mesa.id}
              nome={mesa.name} // adaptamos para a propriedade "name"
              sistema={mesa.sistema}
              dia={mesa.dia}
              horario={mesa.horario}
              vagas={mesa.vagas}
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
