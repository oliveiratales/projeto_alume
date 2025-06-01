import { Sequelize } from "sequelize";
import * as env from "./env";

const sequelize = new Sequelize(
  env.DB_NAME as string,
  env.DB_USER as string,
  env.DB_PASSWORD as string,
  {
    host: env.DB_HOST,
    dialect: "mysql",
    port: env.DB_PORT ? Number(env.DB_PORT) : undefined,
    logging: false,
    timezone: "-03:00",
    dialectOptions: {
      charset: "utf8mb4",
    },
    define: {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
    },
  }
);

export default sequelize;
