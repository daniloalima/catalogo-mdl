import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { Mesa } from "../types/Mesa";

const MesaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mesa, setMesa] = useState<Mesa | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("is_admin") === "true";

  useEffect(() => {
    api.get(`/mesas/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setMesa(res.data.mesa);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar detalhes da mesa:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleAddVaga = () => {
    api.post(`/mesas/${id}/adiciona_vaga`)
      .then((res) => {
        if (res.status === 200) {
          setMesa((prevMesa) => prevMesa ? { ...prevMesa, vagas: prevMesa.vagas + 1 } : prevMesa);
        } else {
          console.error("Erro ao adicionar vaga:", res.data);
        }
      })
      .catch((err) => {
        console.error("Erro ao adicionar vaga:", err);
      });
  };

  const handleRemoveVaga = () => {
    api.post(`/mesas/${id}/remove_vaga`)
      .then((res) => {
        if (res.status === 200) {
          setMesa((prevMesa) => prevMesa ? { ...prevMesa, vagas: prevMesa.vagas - 1 } : prevMesa);
        } else {
          console.error("Erro ao remover vaga:", res.data);
        }
      })
      .catch((err) => {
        console.error("Erro ao remover vaga:", err);
      });
  };

  const handleDeleteMesa = () => {
    const confirmed = window.confirm("Tem certeza que deseja deletar esta mesa?");
    if (confirmed) {
      api.delete(`/mesas/${id}`)
        .then((res) => {
          if (res.status === 200) {
            navigate("/catalog");
          } else {
            console.error("Erro ao deletar mesa:", res.data);
          }
        })
        .catch((err) => {
          console.error("Erro ao deletar mesa:", err);
        });
    }
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-custom-gradient">
        <p className="text-gray-700 text-2xl">Carregando...</p>
      </div>
    );
  }

  if (!mesa) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-2xl">Mesa não encontrada.</p>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-gray-100 bg-custom-gradient">
      <div className="container mx-auto py-10">
        <Link to="/catalog" className="text-blue-500 mb-4 inline-block hover:underline">
          ← Voltar
        </Link>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {mesa.name} {mesa.vagas === 0 && <span className="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">SEM VAGA</span>}
          </h1>
          <p className="mb-2 text-gray-700">
            <strong>Mestre:</strong> {mesa.mestre}
          </p>
          <p className="mb-2 text-gray-700">
            <strong>Sistema:</strong> {mesa.sistema}
          </p>
          <p className="mb-2 text-gray-700">
            <strong>Descrição:</strong> {mesa.descricao}
          </p>
          <p className="mb-2 text-gray-700">
            <strong>Dia:</strong> {mesa.dia}
          </p>
          <p className="mb-2 text-gray-700">
            <strong>Horário:</strong> {mesa.horario}
          </p>
          {isAdmin && (
            <>
              <div className="mb-2 text-gray-700 flex items-center">
                <strong>Vagas: </strong> {mesa.vagas}
                <button
                  className="ml-4 bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  onClick={handleAddVaga}
                >
                  +
                </button>
                <button
                  className="ml-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  onClick={handleRemoveVaga}
                >
                  -
                </button>
              </div>
              <div className="mt-4">
                <button
                  className="bg-gray-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  onClick={handleDeleteMesa}
                >
                  🗑️
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MesaDetail;
