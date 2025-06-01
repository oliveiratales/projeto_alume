import Simulation from "../models/Simulation";
import {
  CreateSimulationDTO,
  UpdateSimulationDTO
} from "../dtos/SimulationDTO";
import { ISimulationRepository } from "../interfaces/simulation/ISimulationRepository";

export class SimulationRepository implements ISimulationRepository {
  async create(data: CreateSimulationDTO): Promise<Simulation> {
    const simulation = await Simulation.create(data);
    return simulation;
  }

  async findById(id: number): Promise<Simulation | null> {
    const simulation = await Simulation.findByPk(id);
    return simulation;
  }

  async update(id: number, data: UpdateSimulationDTO): Promise<void> {
    await Simulation.update(data, { where: { id } });
  }

  async delete(id: number): Promise<void> {
    await Simulation.destroy({ where: { id } });
  }

  async list(): Promise<Simulation[]> {
    return await Simulation.findAll();
  }

  async findByStudentId(studentId: number): Promise<Simulation[]> {
    return await Simulation.findAll({ where: { studentId } });
  }
}
