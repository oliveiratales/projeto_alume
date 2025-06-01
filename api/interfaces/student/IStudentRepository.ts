import Student from "../../models/Student";
import { CreateStudentDTO, UpdateStudentDTO } from "../../dtos/StudentDTO";

export interface IStudentRepository {
  create(data: CreateStudentDTO): Promise<Student>;
  findById(id: number): Promise<Student | null>;
  findByEmail(email: string): Promise<Student | null>;
  update(id: number, data: UpdateStudentDTO): Promise<void>;
  delete(id: number): Promise<void>;
  list(): Promise<Student[]>;
}
