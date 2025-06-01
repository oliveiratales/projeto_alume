import { Request, Response, NextFunction } from "express";
import { SimulationService } from "../services/SimulationService";
import { SimulationRepository } from "../repositories/SimulationRepository";
import { UpdateSimulationDTO } from "../dtos/SimulationDTO";
import { CustomError } from "../utils/CustomError";

export class SimulationController {
  private simulationService: SimulationService;

  constructor() {
    const simulationRepository = new SimulationRepository();
    this.simulationService = new SimulationService(
      simulationRepository
    );
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new CustomError("Usuário não autenticado.", 401);
      }

      const studentId = req.user.studentId;
      const simulation = await this.simulationService.create(
        req.body,
        studentId
      );
      res.status(201).json(simulation);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new CustomError("Usuário não autenticado.", 401);
      }

      const id = Number(req.params.id);
      const studentId = req.user.studentId;
      const simulation = await this.simulationService.getById(
        id,
        studentId
      );
      res.json(simulation);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new CustomError("Usuário não autenticado.", 401);
      }

      const id = Number(req.params.id);
      const studentId = req.user.studentId;
      const data: UpdateSimulationDTO = req.body;
      const updatedSimulation = await this.simulationService.update(
        id,
        data,
        studentId
      );
      res.json(updatedSimulation);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new CustomError("Usuário não autenticado.", 401);
      }

      const id = Number(req.params.id);
      const studentId = req.user.studentId;
      await this.simulationService.delete(id, studentId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  listByStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new CustomError("Usuário não autenticado.", 401);
      }

      const studentId = req.user.studentId;
      const simulations = await this.simulationService.listByStudent(
        studentId
      );
      res.json(simulations);
    } catch (error) {
      next(error);
    }
  };
}
