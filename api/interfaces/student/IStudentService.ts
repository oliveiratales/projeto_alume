import {
  CreateStudentDTO,
  UpdateStudentDTO,
  StudentResponseDTO,
} from "../../dtos/StudentDTO";

export interface IStudentService {
  create(data: CreateStudentDTO): Promise<StudentResponseDTO>;
  getById(id: number): Promise<StudentResponseDTO | null>;
  update(id: number, data: UpdateStudentDTO): Promise<StudentResponseDTO>;
  delete(id: number): Promise<void>;
  list(): Promise<StudentResponseDTO[]>;
  login(
    email: string,
    password: string
  ): Promise<{ token: string; student: StudentResponseDTO }>;
}
