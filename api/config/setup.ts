import sequelize from "./database";
import fs from "fs";
import path from "path";
import { Model, ModelStatic } from "sequelize";

const modelsPath = path.resolve(__dirname, "../models");

interface Models {
  [key: string]: ModelStatic<Model>;
}

const models: Models = {};

const importModels = () => {
  const files = fs
    .readdirSync(modelsPath)
    .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

  for (const file of files) {
    const modelImport = require(path.join(modelsPath, file));
    const model: ModelStatic<Model> = modelImport.default || modelImport;
    models[model.name] = model;
  }
};

const setupAssociations = () => {
  if (models.Simulation && models.Student) {
    models.Simulation.belongsTo(models.Student, {
      foreignKey: "studentId",
      as: "student",
    });

    models.Student.hasMany(models.Simulation, {
      foreignKey: "studentId",
      as: "simulations",
    });
  }
};

export const setupDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexão com o banco de dados estabelecida com sucesso.");

    importModels();

    setupAssociations();

    await sequelize.sync();
    console.log("✅ Tabelas sincronizadas com sucesso.");
  } catch (error) {
    console.error(
      "❌ Erro ao conectar ou sincronizar o banco de dados:",
      error
    );
    process.exit(1);
  }
};

export { models };
