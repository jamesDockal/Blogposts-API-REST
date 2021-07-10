import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../entities/UserEntity";

class UserExistsMIddleware {
  // get the the id and find by it
  async searchByJWT(req: Request, res: Response, next: NextFunction) {
    const { jwt_user_id } = res.locals;

    const userRepository = await getRepository(User);

    const user = await userRepository.findOne({
      id: jwt_user_id,
    });
    if (!user) {
      console.log("user NOT exists");
      return res.status(401).json({ error: "Logged user not found" });
    } else {
      console.log("user exists");
      return next();
    }
  }
  // search an user by the username in the body
  async searchByUsername(req: Request, res: Response, next: NextFunction) {
    const { username } = req.body;

    const user = await getRepository(User).findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    res.locals.user = user;

    return next();
  }
}

export default UserExistsMIddleware;
