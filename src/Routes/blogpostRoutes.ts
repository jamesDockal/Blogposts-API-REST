import { Router } from "express";
import BlogpostController from "../controllers/BlogpostController";
import BlogpostMiddleware from "../middlewares/BlogpostMiddleware";
import verifyToken from "../middlewares/JWTMiddleware";

const BlogRoutes = Router();

const blogpostMiddleware = new BlogpostMiddleware();

const blogpostController = new BlogpostController();

BlogRoutes.get("/", blogpostController.getAllBlogpost);
BlogRoutes.post(
  "/create",
  verifyToken,
  blogpostMiddleware.passedCrendentials,
  blogpostController.createPost
);

export default BlogRoutes;
