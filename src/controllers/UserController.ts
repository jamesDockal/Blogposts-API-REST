import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../entities/UserEntity";

class UserController {
  async createUser(req: Request, res: Response) {
    return res.send("ok").status(200);
  }
}

export default UserController;
