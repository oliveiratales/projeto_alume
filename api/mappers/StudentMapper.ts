import Student from "../models/Student";
import { StudentResponseDTO } from "../dtos/StudentDTO";

export const StudentMapper = {
  toDTO(student: Student): StudentResponseDTO {
    return {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      lastLogin: student.lastLogin ?? null,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    };
  },
};
