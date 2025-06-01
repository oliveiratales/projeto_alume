import dotenv from "dotenv";

dotenv.config();

export const DB_NAME = process.env.DB_NAME || "alume_db";
export const DB_USER = process.env.DB_USER || "user";
export const DB_PASSWORD = process.env.DB_PASSWORD || "admin";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = Number(process.env.DB_PORT) || 3306;
export const ENVIRONMENT = process.env.ENVIRONMENT || "development";
export const PORT = Number(process.env.PORT) || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_secreta";
export const CORS_URL = process.env.CORS_URL || "http://localhost:5173";
