import { NextFunction, Request, Response } from "express";

class UserMiddleware {
  passedCrendentials(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    if (!username) {
      return res.status(400).json({ error: "No username provided!" });
    }
    if (!password) {
      return res.status(400).json({ error: "No password provided!" });
    }

    return next();
  }
}

export default UserMiddleware;
