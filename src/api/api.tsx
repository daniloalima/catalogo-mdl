// src/api/api.ts
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ApiResponse<T> {
  status: number;
  data?: T;
  message?: string;
}

export async function apiPost<T>(endpoint: string, payload: any): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return { status: response.status, data, message: data.message };
  } catch (error: any) {
    console.error("Erro na chamada POST para", endpoint, error);
    return { status: 500, message: error.message };
  }
}

export async function apiGet<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    const data = await response.json();
    return { status: response.status, data, message: data.message };
  } catch (error: any) {
    console.error("Erro na chamada GET para", endpoint, error);
    return { status: 500, message: error.message };
  }
}
