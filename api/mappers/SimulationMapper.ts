import Simulation from "../models/Simulation";
import { SimulationResponseDTO } from "../dtos/SimulationDTO";

export const SimulationMapper = {
  toDTO(simulation: Simulation): SimulationResponseDTO {
    return {
      id: simulation.id,
      totalAmount: Number(simulation.totalAmount),
      numberOfInstallments: simulation.numberOfInstallments,
      monthlyInterestRate: Number(simulation.monthlyInterestRate),
      monthlyInstallmentAmount: Number(simulation.monthlyInstallmentAmount),
      createdAt: simulation.createdAt,
      updatedAt: simulation.updatedAt,
    };
  },
};
