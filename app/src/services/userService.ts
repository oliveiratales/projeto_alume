import axios from "axios";
import { api } from "./http";

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  lastLogin: string;
  createdAt: string;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export async function getUserData(): Promise<UserProfile> {
  try {
    const response = await api.get("/me");
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response || "Erro na requisição";
    }
    throw "Erro desconhecido";
  }
}

export async function updateUserData(
  data: UpdateUserData
): Promise<UserProfile> {
  try {
    const response = await api.put("/me", data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response || "Erro ao atualizar dados do usuário";
    }
    throw "Erro desconhecido";
  }
}
