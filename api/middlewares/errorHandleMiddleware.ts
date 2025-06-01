import { Request, Response, NextFunction } from "express";

interface ErrorWithStatus extends Error {
  status?: number;
}

export function errorHandlerMiddleware(
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  const statusCode = err.status || 500;
  const message =
    statusCode === 500
      ? "Erro interno do servidor"
      : err.message || "Erro desconhecido";

  res.status(statusCode).json({
    error: message,
  });
}
