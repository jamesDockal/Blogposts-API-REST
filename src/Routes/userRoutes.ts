import { Router } from "express";

import UserValidation from "../middlewares/UserMiddleware";
import UserController from "../controllers/UserController";
import verifyToken from "../middlewares/JWTMiddleware";
import { getRepository } from "typeorm";
import User from "../entities/UserEntity";

const UserRoutes = Router();

// middleware of the users
const userValidation = new UserValidation();

// controllers of the user's routes
const userController = new UserController();

// route that gonna send all the users of the app
UserRoutes.get("/", userController.getAllUsers);

// route to create a new user
UserRoutes.post(
  "/register",
  userValidation.passedCrendentials,
  userController.createUser
);

UserRoutes.post(
  "/login",
  userValidation.passedCrendentials,
  userController.login
);

UserRoutes.post(
  "/private-route-test",
  userValidation.passedCrendentials,
  verifyToken,
  userController.teste
);

// delete an user with the passed id on the url
UserRoutes.delete("/:id", async (req, res) => {
  const userRepository = await getRepository(User);

  const user: any = await userRepository.findOne({
    id: req.params.id,
  });
  await userRepository.delete(user);
  res.send("user deleted");
});

export default UserRoutes;
