import { Router } from "express";
import BlogpostController from "../controllers/BlogpostController";
import BlogpostMiddleware from "../middlewares/BlogpostMiddleware";
import JWTMiddleware from "../middlewares/JWTMiddleware";
import UserExists from "../middlewares/userExists";

const BlogRoutes = Router();

const blogpostMiddleware = new BlogpostMiddleware();
const userExist = new UserExists();

const jwtMiddleware = new JWTMiddleware();

const blogpostController = new BlogpostController();

// route to get all the posts
BlogRoutes.get("/", blogpostController.getAllBlogpost);

// route to get a single post by a slug
BlogRoutes.get("/:slug", blogpostController.getOnePost);

/*
  route to create a post
  to create it the user must be logged
  and provide the title and the content
  the title cant be in use of another post
*/
BlogRoutes.post(
  "/create",
  jwtMiddleware.verifyToken,
  userExist.searchByJWT,
  blogpostMiddleware.passedCrendentials,
  blogpostMiddleware.titleAlredyInUse,
  blogpostController.createPost
);

/*
  route to delete a post
  to delete a post the user must be logged
  an provide in the url the id of the post
*/
BlogRoutes.delete(
  "/:id",
  jwtMiddleware.verifyToken,
  userExist.searchByJWT,
  blogpostController.deletePost
);

/*
  route to update a post
  to update a post the user must be logged
  an provide in the url the id of the post
*/
BlogRoutes.put(
  "/:id",
  jwtMiddleware.verifyToken,
  userExist.searchByJWT,
  blogpostController.updatePost
);

export default BlogRoutes;
