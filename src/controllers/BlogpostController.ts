import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Blogpost from "../entities/BlogpostEntity";
import User from "../entities/UserEntity";

class BlogpostController {
  async getAllBlogpost(req: Request, res: Response) {
    const blogpostRepository = await getRepository(Blogpost);

    const allPost = await blogpostRepository.find();

    return res.send(allPost);
  }

  async createPost(req: Request, res: Response) {
    return res.send("ok");
  }
}

export default BlogpostController;
