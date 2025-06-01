import { Request, Response, NextFunction } from "express";
import { StudentService } from "../services/StudentService";
import { StudentRepository } from "../repositories/StudentRepository";
import { CreateStudentDTO, UpdateStudentDTO } from "../dtos/StudentDTO";
import { CustomError } from "../utils/CustomError";

export class StudentController {
  private studentService: StudentService;

  constructor() {
    const studentRepository = new StudentRepository();
    this.studentService = new StudentService(studentRepository);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: CreateStudentDTO = req.body;
      const student = await this.studentService.create(data);
      res.status(201).json(student);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new CustomError("Usuário não autenticado.", 401);
      }
      const studentId = req.user.studentId;

      const student = await this.studentService.getById(studentId);
      res.json(student);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new CustomError("Usuário não autenticado.", 401);
      }
      const studentId = req.user.studentId;
      const data: UpdateStudentDTO = req.body;
      const updatedStudent = await this.studentService.update(studentId, data);
      res.json(updatedStudent);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new CustomError("Usuário não autenticado.", 401);
      }
      const studentId = req.user.studentId;
      await this.studentService.delete(studentId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await this.studentService.login(email, password);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}
