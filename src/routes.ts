// router controller of the express
import { Router } from "express";

// file that does what the routes need to do
import UserController from "./controllers/UserController";
import verifyToken from "./middlewares/JWTMiddleware";

// middlewares
import UserValidation from "./middlewares/UserMiddleware";

const router = Router();

// middleware of the users
const userValidation = new UserValidation();

// controllers of the user's routes
const userController = new UserController();

// route that gonna send all the users of the app
router.get("/user", userController.getAllUsers);

// route that gonna create a new user
router.post(
  "/user/register",
  userValidation.passedCrendentials,
  userController.createUser
);

router.post(
  "/user/login",
  userValidation.passedCrendentials,
  verifyToken,
  userController.login
);

export default router;
