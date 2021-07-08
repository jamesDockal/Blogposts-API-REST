import "./database";
import { Router } from "express";
import UserController from "./controllers/UserController";
import UserValidation from "./middlewares/UserMiddleware";

const router = Router();

const userValidation = new UserValidation();
const userController = new UserController();

router.get("/user", userController.getAllUsers);
router.post(
  "/user",
  userValidation.passedCrendentials,
  userController.createUser
);

export default router;
