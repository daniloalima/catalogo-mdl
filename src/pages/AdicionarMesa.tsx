import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const AdicionarMesa: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    mestre: "",
    vagas: 0,
    sistema: "",
    dia: "",
    horario: "",
    descricao: "",
    image_url: "",
    sessoes_mes: 2, // Valor padrão
    mesa_especial: false // Valor padrão
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "sessoes_mes" ? parseInt(value) : name === "mesa_especial" ? value === "true" : value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Nome é obrigatório";
    if (!formData.mestre) newErrors.mestre = "Mestre é obrigatório";
    if (formData.vagas <= 0) newErrors.vagas = "Vagas deve ser maior que 0";
    if (!formData.sistema) newErrors.sistema = "Sistema é obrigatório";
    if (!formData.dia) newErrors.dia = "Dia é obrigatório";
    if (!formData.horario) newErrors.horario = "Horário é obrigatório";
    if (!formData.sessoes_mes) newErrors.sessoes_mes = "Sessões por mês é obrigatório";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    api.post("/mesas", formData)
      .then((res: { status: number; data: any }) => {
        console.log(res);
        if (res.data.status === 201) {
          console.log("Mesa adicionada com sucesso:", res.data);
          navigate(`/mesa/${res.data.mesa.id}`);
        } else {
          console.error("Erro ao adicionar mesa:", res.data);
        }
      })
      .catch((err: any) => {
        console.error("Erro ao adicionar mesa:", err);
      });
  };

  return (
    <div className="w-screen h-screen bg-custom-gradient flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Adicionar Mesa</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mestre</label>
            <input
              type="text"
              name="mestre"
              value={formData.mestre}
              onChange={handleChange}
              className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
            {errors.mestre && <p className="text-red-500 text-sm">{errors.mestre}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Vagas</label>
            <input
              type="number"
              name="vagas"
              value={formData.vagas}
              onChange={handleChange}
              className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
            {errors.vagas && <p className="text-red-500 text-sm">{errors.vagas}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Sistema</label>
            <input
              type="text"
              name="sistema"
              value={formData.sistema}
              onChange={handleChange}
              className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
            {errors.sistema && <p className="text-red-500 text-sm">{errors.sistema}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Dia</label>
            <select
              name="dia"
              value={formData.dia}
              onChange={handleChange}
              className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              required
            >
              <option value="">Selecione um dia</option>
              <option value="Segunda-feira">Segunda-feira</option>
              <option value="Terça-feira">Terça-feira</option>
              <option value="Quarta-feira">Quarta-feira</option>
              <option value="Quinta-feira">Quinta-feira</option>
              <option value="Sexta-feira">Sexta-feira</option>
              <option value="Sábado">Sábado</option>
              <option value="Domingo">Domingo</option>
            </select>
            {errors.dia && <p className="text-red-500 text-sm">{errors.dia}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Horário</label>
            <input
              type="text"
              name="horario"
              value={formData.horario}
              onChange={handleChange}
              className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
            {errors.horario && <p className="text-red-500 text-sm">{errors.horario}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descrição</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">URL da Imagem</label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Sessões por mês</label>
            <select
              name="sessoes_mes"
              value={formData.sessoes_mes}
              onChange={handleChange}
              className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              required
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
            </select>
            {errors.sessoes_mes && <p className="text-red-500 text-sm">{errors.sessoes_mes}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mesa Especial</label>
            <select
              name="mesa_especial"
              value={formData.mesa_especial ? "true" : "false"}
              onChange={handleChange}
              className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              required
            >
              <option value="false">Não</option>
              <option value="true">Sim</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Adicionar Mesa
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdicionarMesa;