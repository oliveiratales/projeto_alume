import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcrypt";

interface StudentAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  lastLogin?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface StudentCreationAttributes
  extends Optional<
    StudentAttributes,
    "id" | "lastLogin" | "createdAt" | "updatedAt"
  > {}

class Student
  extends Model<StudentAttributes, StudentCreationAttributes>
  implements StudentAttributes
{
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public lastLogin!: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public validPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "students",
    sequelize,
    timestamps: true,
  }
);

export default Student;
