import { NextFunction, Request, Response } from "express";
import userExist from "../utils/userExist";

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
    // if (!slug) {
    //   return res.status(400).json({ error: "You need provide a slug!" });
    // }

    return next();
  }
}

export default BlogpostMiddleware;
