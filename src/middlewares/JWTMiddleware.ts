import { NextFunction, Request, Response } from "express";

export default async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(403).json({ error: "No token provided" });
  }
  next();
}
