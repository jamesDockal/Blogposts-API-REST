import { NextFunction, Request, Response } from "express";

export default async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("headers", req.headers);

  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const splitedHeader = bearerHeader.split(" ");
  console.log("splitedHeader", splitedHeader.length);

  if (splitedHeader[0] !== "Bearer") {
    return res
      .status(400)
      .json({ error: "Token bad formated, it should be 'Bearer ${token}" });
  }
  if (splitedHeader.length < 2) {
    return res
      .status(400)
      .json({ error: "Token bad formated, it should be 'Bearer ${token}" });
  }
  next();
}

//  console.log("splitedHeader", splitedHeader.length);

//  if (splitedHeader.length !== 2) {
//    return res
//      .status(403)
//      .json({ error: "Token bad formated, it should be 'Bearer ${token}" });
//  }
