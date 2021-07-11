import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../entities/UserEntity";
import usernameInUse from "../utils/usernameInUse";
import hashPassword from "../utils/hashPassword";
import { sign } from "jsonwebtoken";

import { compare } from "bcrypt";

import dotenv from "dotenv";
dotenv.config();

class UserController {
  // all user routes are using the middleware passedCrendentials, UserMiddleware
  // that sees if the username and password were sended

  // function to create a new user | post (users/register)
  async createUser(req: Request, res: Response) {
    // get the data of the body
    const { username, password } = req.body;

    // repository that gonna make a conection between the app => entity
    // this entity represents the user's table on the databse
    const userRepository = getRepository(User);

    // try catch to see if the username alredy exists on the database
    try {
      await usernameInUse(username);
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

    // create the token for the user can get logged
    const secretKey = process.env.SECRET_KEY || "some_secret_key";
    const token = await sign(user.id, secretKey);

    // return status 200 as everything worked
    return res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
      },
      token,
    });
  }
  // function to get all users | get (users/)
  async getAllUsers(req: Request, res: Response) {
    // repository that gonna make a conection between the app => entity
    // this entity represents the user's table on the databse
    const userRepository = await getRepository(User);

    // get all users
    const users = await userRepository.find();

    // removing the password to the response
    const userFormated = await users.map((element) => {
      return {
        id: element.id,
        username: element.username,
      };
    });
    // return status 200 as everything worked
    return res.status(200).json({ users: userFormated });
  }

  async login(req: Request, res: Response) {
    const { password } = req.body;
    const { user } = res.locals;

    // console.log("logged", user);

    // verify if the user password is the same in database
    const rightPassword = await compare(password, user.password_hash);
    if (!rightPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // create a token to the user,
    // for get logged in app
    // provided it to the authorization header
    // like { authorization: `Bearer ${token}`}
    const secretKey = process.env.SECRET_KEY || "some_secret_key";
    const token = await sign(user.id, secretKey);

    res.status(200).json({
      token,
      user: {
        username: user.username,
        id: user.id,
      },
    });
  }
  teste(req: Request, res: Response) {
    return res.send("ok");
  }
}

export default UserController;
