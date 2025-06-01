import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface SimulationAttributes {
  id: number;
  studentId: number;
  totalAmount: number;
  numberOfInstallments: number;
  monthlyInterestRate: number;
  monthlyInstallmentAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface SimulationCreationAttributes
  extends Optional<
    SimulationAttributes,
    "id" | "monthlyInstallmentAmount" | "createdAt"
  > {}

class Simulation
  extends Model<SimulationAttributes, SimulationCreationAttributes>
  implements SimulationAttributes
{
  public id!: number;
  public studentId!: number;
  public totalAmount!: number;
  public numberOfInstallments!: number;
  public monthlyInterestRate!: number;
  public monthlyInstallmentAmount!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Simulation.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "students",
        key: "id",
      },
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    numberOfInstallments: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    monthlyInterestRate: {
      type: DataTypes.DECIMAL(5, 4),
      allowNull: false,
    },
    monthlyInstallmentAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "simulations",
    sequelize,
    timestamps: true,
  }
);

export default Simulation;
