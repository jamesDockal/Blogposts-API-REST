import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import Blogpost from "../entities/BlogpostEntity";

class BlogpostMiddleware {
  // to created a post, you have to pass the necessary informations
  // that are title, content and slug
  passedCrendentials(req: Request, res: Response, next: NextFunction) {
    const { title, content } = req.body;

    if (!title) {
      return res.status(400).json({ error: "You need provide a title!" });
    }
    if (!content) {
      return res.status(400).json({ error: "You need provide a content!" });
    }

    return next();
  }
  async titleAlredyInUse(req: Request, res: Response, next: NextFunction) {
    // search if the title alredy in use

    const { title } = req.body;

    const blogpostRepository = getRepository(Blogpost);

    const post = await blogpostRepository.findOne({
      title,
    });

    // the post exist, that means that the title is in use
    if (post) {
      return res
        .status(409)
        .json({ error: "The title of the post is alredy in use!" });
    }

    return next();
  }
}

export default BlogpostMiddleware;
