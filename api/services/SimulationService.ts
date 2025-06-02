import { ISimulationService } from "../interfaces/simulation/ISimulationService";
import { ISimulationRepository } from "../interfaces/simulation/ISimulationRepository";
import {
  CreateSimulationDTO,
  UpdateSimulationDTO,
  SimulationResponseDTO,
} from "../dtos/SimulationDTO";
import { SimulationMapper } from "../mappers/SimulationMapper";
import { CustomError } from "../utils/CustomError";

export class SimulationService implements ISimulationService {
  constructor(private simulationRepository: ISimulationRepository) {}

  async create(
    data: CreateSimulationDTO,
    studentId: number
  ): Promise<SimulationResponseDTO> {

    data.studentId = studentId;
    const simulation = await this.simulationRepository.create(
      data
    );
    return SimulationMapper.toDTO(simulation);
  }

  async getById(
    id: number,
    studentId: number
  ): Promise<SimulationResponseDTO | null> {
    const simulation = await this.simulationRepository.findById(id);
    if (!simulation) {
      throw new CustomError("Simulação não encontrada.", 404);
    }
    if (simulation.studentId !== studentId) {
      throw new CustomError("Acesso negado.", 403);
    }

    return SimulationMapper.toDTO(simulation);
  }

  async update(
    id: number,
    data: UpdateSimulationDTO,
    studentId: number
  ): Promise<SimulationResponseDTO> {
    const simulation = await this.simulationRepository.findById(id);
    if (!simulation) {
      throw new CustomError("Simulação não encontrada.", 404);
    }
    if (simulation.studentId !== studentId) {
      throw new CustomError("Acesso negado.", 403);
    }

    const updatedData = {
      totalAmount: data.totalAmount ?? simulation.totalAmount,
      monthlyInterestRate:
        data.monthlyInterestRate ?? simulation.monthlyInterestRate,
      numberOfInstallments:
        data.numberOfInstallments ?? simulation.numberOfInstallments,
      monthlyInstallmentAmount:
        data.monthlyInstallmentAmount ?? simulation.monthlyInstallmentAmount,
    };

    await this.simulationRepository.update(id, updatedData);

    const updated = await this.simulationRepository.findById(id);
    return SimulationMapper.toDTO(updated!);
  }

  async delete(id: number, studentId: number): Promise<void> {
    const simulation = await this.simulationRepository.findById(id);
    if (!simulation) {
      throw new CustomError("Simulação não encontrada.", 404);
    }
    if (simulation.studentId !== studentId) {
      throw new CustomError("Acesso negado.", 403);
    }

    await this.simulationRepository.delete(id);
  }

  async listByStudent(studentId: number): Promise<SimulationResponseDTO[]> {
    const simulations = await this.simulationRepository.findByStudentId(
      studentId
    );

    return simulations.map(SimulationMapper.toDTO);
  }
}
