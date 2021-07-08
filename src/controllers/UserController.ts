import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../entities/UserEntity";
import existUsers from "../utils/existUser";
import hashPassword from "../utils/hashPassword";

class UserController {
  // all user routes are using the middleware passedCrendentials, UserMiddleware
  // that sees if the username and password were sended

  // function to create a new user | post (users/)
  async createUser(req: Request, res: Response) {
    // get the data of the body
    const { username, password } = req.body;

    // repository that gonna make a conection between the app => entity
    // this entity represents the user's table on the databse
    const userRepository = getRepository(User);

    // try catch to see if the username alredy exists on the database
    try {
      await existUsers(username);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    // function to hash the password that was given into a hashed password
    const password_hash = await hashPassword(password);

    // create a model of the with the username and the new password that was hashed
    const user = await userRepository.create({
      username,
      password_hash,
    });

    // save the user in the databse
    await userRepository.save(user);

    // return status 200 as everything worked
    return res.send(user).status(200);
  }
  // function to get all users | get (users/)
  async getAllUsers(req: Request, res: Response) {
    // repository that gonna make a conection between the app => entity
    // this entity represents the user's table on the databse
    const userRepository = await getRepository(User);

    // get all users
    const users = await userRepository.find();

    // return status 200 as everything worked
    return res.status(200).json({ users });
  }
}

export default UserController;
