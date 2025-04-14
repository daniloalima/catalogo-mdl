// src/pages/Home.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    localStorage.setItem("is_admin", "false");
    navigate("/catalog");
  };

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
        <div className="flex justify-center space-x-4">
          <Link
            to="/login"
            className="bg-white text-purple-400 px-8 py-4 rounded-lg text-xl font-semibold shadow-md hover:bg-purple-500 transition-colors duration-300"
          >
            <span className="text-black-500 group-hover:text-black">
              Admin
            </span>
          </Link>
          <button
            onClick={handleGuestLogin}
            className="bg-white text-purple-400 px-8 py-4 rounded-lg text-xl font-semibold shadow-md hover:bg-purple-500 transition-colors duration-300"
          >
            <span className="text-black-500 group-hover:text-black">
              Acesse as mesas com vagas
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
