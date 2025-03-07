// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-custom-gradient flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-8 tracking-wide drop-shadow-lg">
          Bem-vindo ao Catálogo de mesas
        </h1>
        <div className="mt-8 m-4">
        <img
          src="https://u.cubeupload.com/dann_h/mdllogo.png"
          alt="logotipo"
          className="w-90 h-auto mx-auto"
        />
      </div>
        <Link
          to="/login"
          className="bg-white text-purple-400 px-8 py-4 rounded-lg text-xl font-semibold shadow-md hover:bg-purple-500 transition-colors duration-300"
        >
          <span className="text-black-500 group-hover:text-black">
            Login
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
