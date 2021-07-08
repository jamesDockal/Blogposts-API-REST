import { NextFunction, Request, Response } from "express";

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
      return res.status(400).json({ error: "You need provide the user_id!" });
    }

    return next();
  }
}

export default BlogpostMiddleware;
