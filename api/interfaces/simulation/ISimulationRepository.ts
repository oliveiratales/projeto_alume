import Simulation from "../../models/Simulation";
import {
  CreateSimulationDTO,
  UpdateSimulationDTO,
} from "../../dtos/SimulationDTO";

export interface ISimulationRepository {
  create(data: CreateSimulationDTO): Promise<Simulation>;
  findById(id: number): Promise<Simulation | null>;
  update(id: number, data: UpdateSimulationDTO): Promise<void>;
  delete(id: number): Promise<void>;
  list(): Promise<Simulation[]>;
  findByStudentId(studentId: number): Promise<Simulation[]>;
}
