export interface CreateStudentDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateStudentDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export interface StudentResponseDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginDTO {
  email: string;
  password: string;
}
