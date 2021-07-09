import { Router } from "express";
import BlogpostController from "../controllers/BlogpostController";
import BlogpostMiddleware from "../middlewares/BlogpostMiddleware";
import JWTMiddleware from "../middlewares/JWTMiddleware";
import verifyToken from "../middlewares/JWTMiddleware";
import UserExists from "../middlewares/userExists";

const BlogRoutes = Router();

const blogpostMiddleware = new BlogpostMiddleware();
const userExist = new UserExists();

const jwtMiddleware = new JWTMiddleware();

const blogpostController = new BlogpostController();

BlogRoutes.get("/", blogpostController.getAllBlogpost);

BlogRoutes.post(
  "/create",
  jwtMiddleware.verifyToken,
  userExist.searchByJWT,
  blogpostMiddleware.passedCrendentials,
  blogpostMiddleware.titleAlredyInUse,
  blogpostController.createPost
);

BlogRoutes.delete(
  "/:id",
  jwtMiddleware.verifyToken,
  userExist.searchByJWT,
  blogpostController.deletePost
);

export default BlogRoutes;
