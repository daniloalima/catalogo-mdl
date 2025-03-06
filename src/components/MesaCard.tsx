// src/components/MesaCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface MesaCardProps {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
}

const MesaCard: React.FC<MesaCardProps> = ({ id, nome, descricao, imagem }) => {
  return (
    <Link to={`/mesa/${id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg m-4 transform transition duration-500 hover:scale-105 hover:shadow-2xl animate-fadeIn">
        <img
          src={imagem}
          alt={`Imagem da mesa ${nome}`}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">{nome}</h2>
          <p className="text-gray-600 mt-2">{descricao}</p>
        </div>
      </div>
    </Link>
  );
};

export default MesaCard;
