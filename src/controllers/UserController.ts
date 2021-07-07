import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../entities/UserEntity";

class UserController {
  async createUser(req: Request, res: Response) {
    const userRepository = await getRepository(User);

    const user = await userRepository.create({
      username: "teste",
      password_hash: "teste",
    });

    userRepository.save(user);

    return res.json(user);
  }

  async getUsers(req: Request, res: Response) {
    const userRepository = await getRepository(User);

    const users = await userRepository.find();

    return res.json({ users });
  }

  async deleteUser(req: Request, res: Response) {
    const userRepository = await getRepository(User);

    const user: any = await userRepository.findOne({ username: "teste" });
    await userRepository.delete(user);

    const users = await userRepository.find();

    return res.json({ users });
  }
}

export default UserController;
