// src/pages/MesaDetail.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

interface Params {
    id: string;
    [key: string]: string | undefined;
  }

const MesaDetail: React.FC = () => {
  const { id } = useParams<Params>();

  // Aqui você pode buscar os dados da mesa a partir do id (via API, contexto, etc.)
  // Por enquanto, usaremos dados fictícios para demonstração.
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto py-10">
        <Link to="/" className="text-white mb-4 inline-block">← Voltar</Link>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4">Detalhes da Mesa {id}</h1>
          <p>
            Aqui você pode exibir detalhes completos da mesa, como descrição, imagens, regras,
            e outros dados relevantes.
          </p>
          {/* Insira mais informações ou componentes conforme necessário */}
        </div>
      </div>
    </div>
  );
};

export default MesaDetail;
