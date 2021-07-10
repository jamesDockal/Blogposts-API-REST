import { Router } from "express";

import UserValidation from "../middlewares/UserMiddleware";
import UserController from "../controllers/UserController";
import verifyToken from "../middlewares/JWTMiddleware";
import { getRepository } from "typeorm";
import User from "../entities/UserEntity";
import JWTMiddleware from "../middlewares/JWTMiddleware";
import UserExistsMIddleware from "../middlewares/userExists";

const UserRoutes = Router();

// middleware of the users
const userValidation = new UserValidation();

// controllers of the user's routes
const userController = new UserController();

const userExists = new UserExistsMIddleware();

const jwtMiddleware = new JWTMiddleware();

// route that gonna get all the users of the app
UserRoutes.get("/", userController.getAllUsers);

/*
  route to create a new user
  to create an user it must provide username and password on the body
  the username cant be using by other user 
*/
UserRoutes.post(
  "/register",
  userValidation.passedCrendentials,
  userController.createUser
);

/*
  route to create a new user
  to create an user it must provide username and password on the body
  the username cant be using by other user 
*/
UserRoutes.post(
  "/login",
  userValidation.passedCrendentials,
  userExists.searchByUsername,
  userController.login
);

// a route to test the token to loggin
UserRoutes.post(
  "/private-route-test",
  userValidation.passedCrendentials,
  jwtMiddleware.verifyToken,
  userController.teste
);

// delete an user with the passed id on the url
UserRoutes.delete("/:id", async (req, res) => {
  try {
    const userRepository = await getRepository(User);

    const user: any = await userRepository.findOne({
      id: req.params.id,
    });
    await userRepository.delete(user);
    return res.send("user deleted");
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

export default UserRoutes;
