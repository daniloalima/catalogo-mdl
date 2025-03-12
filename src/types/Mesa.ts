// src/types/Mesa.ts
export interface Mesa {
    id: number;
    name: string;
    mestre: string;
    sistema: string;
    descricao: string;
    dia: string;
    horario: string;
    vagas: number;
    image_url?: string;
    sessoes_mes: number;
    mesa_especial: boolean;
  }