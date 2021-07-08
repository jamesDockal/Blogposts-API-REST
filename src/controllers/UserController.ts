import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../entities/UserEntity";

class UserController {
  async createUser(req: Request, res: Response) {
    const { username, password } = req.body;

    if (!username) {
      return res.status(400).json({ error: "No username provided!" });
    }
    if (!password) {
      return res.status(400).json({ error: "No password provided!" });
    }

    return res.send("ok").status(200);
  }
}

export default UserController;
