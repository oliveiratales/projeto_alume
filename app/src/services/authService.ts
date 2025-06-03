import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export async function login(data: LoginData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.error || "Erro na requisição";
    }
    throw "Erro desconhecido";
  }
}

export async function register(data: RegisterData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.error || "Erro na requisição";
    }
    throw "Erro desconhecido";
  }
}
