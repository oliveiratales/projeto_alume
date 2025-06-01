import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "sua_chave_secreta";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "Token inválido" });
      return;
    }

    const payload = decoded as { id: number; email?: string };

    req.user = { studentId: payload.id, email: payload.email };
    next();
  });
};
