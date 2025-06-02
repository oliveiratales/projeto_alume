export interface CreateSimulationDTO {
  studentId: number;
  totalAmount: number;
  numberOfInstallments: number;
  monthlyInterestRate: number;
  monthlyInstallmentAmount: number;
}

export interface UpdateSimulationDTO {
  totalAmount?: number;
  numberOfInstallments?: number;
  monthlyInterestRate?: number;
  monthlyInstallmentAmount?: number;
}

export interface SimulationResponseDTO {
  id: number;
  totalAmount: number;
  numberOfInstallments: number;
  monthlyInterestRate: number;
  monthlyInstallmentAmount: number;
  createdAt: Date;
  updatedAt: Date;
}
