import { Router } from "express";
import BlogpostController from "../controllers/BlogpostController";
import BlogpostMiddleware from "../middlewares/BlogpostMiddleware";
import verifyToken from "../middlewares/JWTMiddleware";
import UserExists from "../middlewares/userExists";

const BlogRoutes = Router();

const blogpostMiddleware = new BlogpostMiddleware();
const userExist = new UserExists();

const blogpostController = new BlogpostController();

BlogRoutes.get("/", blogpostController.getAllBlogpost);
BlogRoutes.post(
  "/create",
  verifyToken,
  userExist.searchByJWT,
  blogpostMiddleware.passedCrendentials,
  blogpostController.createPost
);

export default BlogRoutes;
