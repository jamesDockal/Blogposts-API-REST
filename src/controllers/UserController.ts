import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import User from "../entities/UserEntity";
import hashPassword from "../utils/hashPassword";

class UserController {
  async createUser(req: Request, res: Response) {
    const userRepository = getRepository(User);

    const { username, password } = req.body;

    const existUser = await userRepository.findOne({ username });
    if (existUser) {
      return res.send({ error: "Username alredy in use" }).status(400);
    }

    const password_hash = await hashPassword(password);

    const user = await userRepository.create({
      username,
      password_hash,
    });

    await userRepository.save(user);

    return res.send(user).status(200);
  }

  async getAllUsers(req: Request, res: Response) {
    const userRepository = await getRepository(User);

    const users = await userRepository.find();

    return res.json({ users });
  }
}

export default UserController;
