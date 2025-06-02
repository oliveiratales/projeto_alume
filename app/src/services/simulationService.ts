import axios from "axios";
import { api } from "./http";

export interface Simulation {
  id: number;
  totalAmount: number;
  monthlyInterestRate: number;
  numberOfInstallments: number;
  monthlyInstallmentAmount: number;
  createdAt: string;
}

export async function getUserSimulations(): Promise<Simulation[]> {
  try {
    const response = await api.get("/simulations");
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response || "Erro na requisição";
    }
    throw "Erro desconhecido";
  }
}
