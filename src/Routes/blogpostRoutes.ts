import { Router } from "express";
import BlogpostController from "../controllers/BlogpostController";
import BlogpostMiddleware from "../middlewares/BlogpostMiddleware";

const BlogRoutes = Router();

const blogpostMiddleware = new BlogpostMiddleware();

const blogpostController = new BlogpostController();

BlogRoutes.get("/", blogpostController.getAllBlogpost);
BlogRoutes.post(
  "/create",
  blogpostMiddleware.passedCrendentials,
  blogpostMiddleware.valiedUserId,
  blogpostController.createPost
);

export default BlogRoutes;
