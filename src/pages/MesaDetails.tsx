import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { Mesa } from "../types/Mesa";

const MesaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mesa, setMesa] = useState<Mesa | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("is_admin") === "true";
  const whatsappBaseLink = import.meta.env.VITE_WHATSAPP_LINK;

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

  const handleContact = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  const mesaUrl = `${window.location.origin}/mesa/${id}`;
  const whatsappMessage = `Olá, eu vim do catálogo e tenho interesse na mesa: ${mesa.name}.\n\n${mesaUrl}`;
  const whatsappLink = `${whatsappBaseLink}${encodeURIComponent(whatsappMessage)}`;

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
          <p className="mb-2 text-gray-700">
            <strong>Sessões por mês:</strong> {mesa.sessoes_mes}
          </p>
          <p className="mb-2 text-gray-700">
            <strong>Vagas: </strong> {mesa.vagas}
          </p>
          {isAdmin && (
            <>
              <div className="mb-2 text-gray-700 flex items-center">
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
              <div className="mt-4 flex space-x-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-transform transform hover:scale-105 shadow-lg"
                  onClick={handleDeleteMesa}
                >
                  🗑️ Deletar Mesa
                </button>
                <Link
                  to={`/mesa/${id}/edit`}
                  className="bg-white-500 border-1 border-red text-black px-4 py-2 rounded hover:bg-white-600 transition-transform transform hover:scale-105 shadow-lg"
                >
                  Editar Mesa
                </Link>
              </div>
            </>
          )}
          <div className="mt-4 flex space-x-4">
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-transform transform hover:scale-105 shadow-lg"
              onClick={handleContact}
            >
              Tenho interesse!
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Tenho interesse!</h2>
            <p className="mb-4 text-gray-700">Clique no link abaixo para conversar com a pessoa que vai te ajudar c:</p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mb-4 block">
              Contato
            </a>
            <div className="flex justify-center mb-4">
              <img src="/qrcode-dan.png" alt="QR Code" />
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-transform transform hover:scale-105 shadow-lg"
              onClick={closeModal}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MesaDetail;
