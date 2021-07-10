import { Response } from "express";
import { getRepository } from "typeorm";
import Blogpost from "../entities/BlogpostEntity";

export default async function findPostBySlug(res: Response, slug: string) {
  const blogpostRepository = getRepository(Blogpost);

  const post = await blogpostRepository.findOne({
    slug,
  });

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  return res.json({ post });
}
