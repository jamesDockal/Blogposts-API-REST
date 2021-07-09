import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../entities/UserEntity";

class UserExists {
  async searchByJWT(req: Request, res: Response, next: NextFunction) {
    const { jwt_user_id } = res.locals;

    const userRepository = await getRepository(User);

    const user = await userRepository.findOne({
      id: jwt_user_id,
    });
    if (!user) {
      console.log("user NOT exist");

      return res.status(401).json({ error: "Logged user not found" });
    } else {
      console.log("user exist");
      return next();
    }
  }
}

export default UserExists;
