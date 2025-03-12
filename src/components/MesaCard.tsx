// src/components/MesaCard.tsx
import React from "react";
import { Link } from "react-router-dom";

interface MesaCardProps {
  id: number;
  nome: string;
  sistema: string;
  dia: string;
  horario: string;
  imagem: string;
  vagas: number;
  mesa_especial: boolean;
}

const MesaCard: React.FC<MesaCardProps> = ({
  id,
  nome,
  sistema,
  dia,
  horario,
  vagas,
  imagem,
  mesa_especial,
}) => {
  return (
    <Link to={`/mesa/${id}`}>
      <div
        className={`bg-white rounded-lg overflow-hidden shadow-lg m-4 transform transition duration-500 hover:scale-105 hover:shadow-2xl animate-fadeIn ${
          mesa_especial ? "border-5 border-yellow-500 animate-border" : "border border-gray-300"
        }`}
      >
        <img
          src={imagem}
          alt={`Imagem da mesa ${nome}`}
          className="w-full h-48 object-cover"
        />
        {vagas <= 0 && (
          <span className="absolute bottom-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
            SEM VAGAS
          </span>
        )}
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">{nome}</h2>
          <p className="text-gray-600 mt-2">{dia} - {horario}</p>
        </div>
      </div>
    </Link>
  );
};

export default MesaCard;
