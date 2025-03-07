// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api/api";
import { LoginResponse } from "../types/LoginResponse";

const Login: React.FC = () => {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const { status, data, message } = await apiPost<LoginResponse>("/login", { usuario, senha });

      if (status === 200 && data) {
        localStorage.setItem("is_admin", data.is_admin ? "true" : "false");
        navigate("/catalog");
      } else {
        setError(message || "Credenciais inválidas. Tente novamente.");
      }
    };

  return (
    <div className="w-screen h-screen flex items-center justify-center text-gray-800 bg-custom-gradient">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Login
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Usuário:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition-colors"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
