import Student from "../models/Student";
import { CreateStudentDTO, UpdateStudentDTO } from "../dtos/StudentDTO";
import { IStudentRepository } from "../interfaces/student/IStudentRepository";

export class StudentRepository implements IStudentRepository {
  async create(data: CreateStudentDTO): Promise<Student> {
    const student = await Student.create(data);
    return student;
  }

  async findById(id: number): Promise<Student | null> {
    const student = await Student.findByPk(id);
    return student;
  }

  async findByEmail(email: string): Promise<Student | null> {
    const student = await Student.findOne({ where: { email } });
    return student;
  }

  async update(id: number, data: UpdateStudentDTO): Promise<void> {
    await Student.update(data, { where: { id } });
  }

  async delete(id: number): Promise<void> {
    await Student.destroy({ where: { id } });
  }

  async list(): Promise<Student[]> {
    const students = await Student.findAll();
    return students;
  }
}
