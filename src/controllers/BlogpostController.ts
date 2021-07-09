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
    // get the necessary information to create a post
    const { title, content } = req.body;
    const created_by = res.locals.jwt_user_id;

    const blogpostRepository = getRepository(Blogpost);

    // The slug of the post gonna be a transformation of the title
    // Ex: Title : "React, getting started!"
    // Result: Slug: "react-getting-started"
    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

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

  async deletePost(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "To delete a post, you must pass an the id on the url ",
      });
    }
    const blogpostRepository = await getRepository(Blogpost);

    const post: any = await blogpostRepository.findOne({
      id,
    });
    console.log(post);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    try {
      await blogpostRepository.delete(post);
      return res.json({ sucess: "Post deleted" });
    } catch (e) {
      return res.status(500).json({
        error: e.message,
      });
    }
  }
}

export default BlogpostController;
