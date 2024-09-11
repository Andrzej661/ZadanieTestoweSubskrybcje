import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const user = verifyToken(token);
    (req as any).user = user; // Attach user info to request
    next();
  } catch (error) {
    res.sendStatus(403);
  }
}
