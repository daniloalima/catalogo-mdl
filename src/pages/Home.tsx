// src/pages/Home.tsx
import React from 'react';
import MesaCard from '../components/MesaCard';

interface Mesa {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
}

const mesas: Mesa[] = [
  {
    id: 1,
    nome: 'Mesa Aventura Épica',
    descricao: 'Uma mesa para aventuras repletas de desafios e emoção.',
    imagem: 'https://placehold.co/400x300?text=Mesa+1'
  },
  {
    id: 2,
    nome: 'Mesa Mistérios e Magia',
    descricao: 'Explore mundos místicos com enigmas e surpresas.',
    imagem: 'https://placehold.co/400x300?text=Mesa+2'
  },
  {
    id: 3,
    nome: 'Mesa Desafio e Estratégia',
    descricao: 'Testa suas habilidades em jogos táticos e desafiadores.',
    imagem: 'https://placehold.co/400x300?text=Mesa+3'
  }
];

const Home: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-extrabold text-center text-white mb-10">
          Catálogo de Mesas de RPG
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mesas.map((mesa) => (
            <MesaCard
              key={mesa.id}
              id={mesa.id}
              nome={mesa.nome}
              descricao={mesa.descricao}
              imagem={mesa.imagem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
