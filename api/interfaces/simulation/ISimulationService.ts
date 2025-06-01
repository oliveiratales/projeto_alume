import {
  CreateSimulationDTO,
  UpdateSimulationDTO,
  SimulationResponseDTO,
} from "../../dtos/SimulationDTO";

export interface ISimulationService {
  create(data: CreateSimulationDTO, studentId: number): Promise<SimulationResponseDTO>;
  getById(
    id: number,
    studentId: number
  ): Promise<SimulationResponseDTO | null>;
  update(
    id: number,
    data: UpdateSimulationDTO,
    studentId: number
  ): Promise<SimulationResponseDTO>;
  delete(id: number, studentId: number): Promise<void>;
  listByStudent(studentId: number): Promise<SimulationResponseDTO[]>;
}
