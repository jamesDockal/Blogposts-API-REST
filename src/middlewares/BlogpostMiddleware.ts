import { NextFunction, Request, Response } from "express";
import userExist from "../utils/userExist";

class BlogpostMiddleware {
  passedCrendentials(req: Request, res: Response, next: NextFunction) {
    const { title, content, slug, created_by } = req.body;

    if (!title) {
      return res.status(400).json({ error: "You need provide a title!" });
    }
    if (!content) {
      return res.status(400).json({ error: "You need provide a content!" });
    }
    if (!slug) {
      return res.status(400).json({ error: "You need provide a slug!" });
    }
    if (!created_by) {
      return res
        .status(400)
        .json({ error: "You need provide the created_by!" });
    }

    return next();
  }
  // this middleware gonna see if the 'user id' passed through created_by exist on db
  async valiedUserId(req: Request, res: Response, next: NextFunction) {
    const { created_by } = req.body;
    try {
      const user = await userExist(created_by);
      return next();
    } catch (e) {
      return res.status(406).json({ error: e.message });
    }
  }
}

export default BlogpostMiddleware;
