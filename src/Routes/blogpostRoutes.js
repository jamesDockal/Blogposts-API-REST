"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var BlogpostController_1 = __importDefault(require("../controllers/BlogpostController"));
var BlogpostMiddleware_1 = __importDefault(require("../middlewares/BlogpostMiddleware"));
var JWTMiddleware_1 = __importDefault(require("../middlewares/JWTMiddleware"));
var userExists_1 = __importDefault(require("../middlewares/userExists"));
var BlogRoutes = express_1.Router();
var blogpostMiddleware = new BlogpostMiddleware_1.default();
var userExist = new userExists_1.default();
var jwtMiddleware = new JWTMiddleware_1.default();
var blogpostController = new BlogpostController_1.default();
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
BlogRoutes.post("/create", jwtMiddleware.verifyToken, userExist.searchByJWT, blogpostMiddleware.passedCrendentials, blogpostMiddleware.titleAlredyInUse, blogpostController.createPost);
/*
  route to delete a post
  to delete a post the user must be logged
  an provide in the url the id of the post
*/
BlogRoutes.delete("/:id", jwtMiddleware.verifyToken, userExist.searchByJWT, blogpostController.deletePost);
/*
  route to update a post
  to update a post the user must be logged
  an provide in the url the id of the post
*/
BlogRoutes.put("/:id", jwtMiddleware.verifyToken, userExist.searchByJWT, blogpostController.updatePost);
exports.default = BlogRoutes;
