import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Blogpost from "../entities/BlogpostEntity";

class BlogpostController {
  async getAllBlogpost(req: Request, res: Response) {
    const blogpostRepository = await getRepository(Blogpost);

    const allPost = await blogpostRepository.find();

    return res.send(allPost);
  }

  async createPost(req: Request, res: Response) {
    const { title, content, slug } = req.body;
    const created_by = res.locals.jwt_user_id;

    const blogpostRepository = getRepository(Blogpost);

    // creating the new post and save it
    const newPost = await blogpostRepository.create({
      title,
      content,
      slug,
      created_by,
    });
    await blogpostRepository.save(newPost);

    // return the new post that was created
    return res.json({ post: newPost });
  }
}

export default BlogpostController;
