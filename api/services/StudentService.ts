import { IStudentService } from "../interfaces/student/IStudentService";
import { IStudentRepository } from "../interfaces/student/IStudentRepository";
import {
  CreateStudentDTO,
  UpdateStudentDTO,
  StudentResponseDTO,
} from "../dtos/StudentDTO";
import { StudentMapper } from "../mappers/StudentMapper";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { CustomError } from "../utils/CustomError";
import bcrypt from "bcrypt";

export class StudentService implements IStudentService {
  constructor(private studentRepository: IStudentRepository) {}

  async create(data: CreateStudentDTO): Promise<StudentResponseDTO> {
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    const student = await this.studentRepository.create(data);
    return StudentMapper.toDTO(student);
  }

  async getById(id: number): Promise<StudentResponseDTO | null> {
    const student = await this.studentRepository.findById(id);
    if (!student) {
      throw new CustomError("Estudante não encontrado.", 404);
    }

    return StudentMapper.toDTO(student);
  }

  async update(
    id: number,
    data: UpdateStudentDTO
  ): Promise<StudentResponseDTO> {
    const existingStudent = await this.studentRepository.findById(id);
    if (!existingStudent) {
      throw new CustomError("Estudante não encontrado.", 404);
    }

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    await this.studentRepository.update(id, data);
    const updatedStudent = await this.studentRepository.findById(id);
    return StudentMapper.toDTO(updatedStudent!);
  }

  async delete(id: number): Promise<void> {
    const student = await this.studentRepository.findById(id);
    if (!student) {
      throw new CustomError("Estudante não encontrado.", 404);
    }
    await this.studentRepository.delete(id);
  }

  async list(): Promise<StudentResponseDTO[]> {
    const students = await this.studentRepository.list();
    return students.map(StudentMapper.toDTO);
  }

  async login(
    email: string,
    password: string
  ): Promise<{ token: string; student: StudentResponseDTO }> {
    const student = await this.studentRepository.findByEmail(email);

    if (!student || !student.validPassword(password)) {
      throw new CustomError("Credenciais inválidas", 401);
    }

    student.lastLogin = new Date();
    await student.save();

    const token = jwt.sign(
      { id: student.id, email: student.email },
      JWT_SECRET,
      {
        expiresIn: "5m",
      }
    );

    return {
      token,
      student: StudentMapper.toDTO(student),
    };
  }
}
