import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Blogpost from "../entities/BlogpostEntity";

class BlogpostController {
  async getAllBlogpost(req: Request, res: Response) {
    /*
      find all the posts and returning it 
    */
    const blogpostRepository = await getRepository(Blogpost);
    const allPost = await blogpostRepository.find();

    return res.send(allPost);
  }

  async getOnePost(req: Request, res: Response) {
    /*
      to find a post, must in the url have its slug
      if it the slug is an existed one,
      it gonna return it
      but if not
      gonna return status 404
    */
    const { slug } = req.params;

    const blogpost = await getRepository(Blogpost);

    // find by the slug
    const post = await blogpost.findOne({
      slug,
    });

    // post not found
    if (!post) {
      return res.status(404).json({
        error: "Post not found",
      });
    }

    return res.json({ post });
  }

  async createPost(req: Request, res: Response) {
    // get the necessary information to create a post
    const { title, content } = req.body;
    const created_by = res.locals.jwt_user_id;

    const blogpostRepository = getRepository(Blogpost);

    /*
      The slug of the post gonna be a transformation of the title
      Ex: Title : "React, getting started!"
      Result: Slug: "react-getting-started"
    */
    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    try {
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
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }

  async deletePost(req: Request, res: Response) {
    /* 
      to delete a post, must in the url has its id
      it gonna find the post
      and delete it
    */

    // no id provided
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        error: "To delete a post, you must pass an the id on the url ",
      });
    }

    // searching for the post
    const blogpostRepository = await getRepository(Blogpost);
    const post: any = await blogpostRepository.findOne({
      id,
    });

    // post doest not exist by the given id
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    try {
      // deleting the post
      await blogpostRepository.delete(post);
      return res.json({ success: "Post deleted" });
    } catch (e) {
      return res.status(500).json({
        error: e.message,
      });
    }
  }

  async updatePost(req: Request, res: Response) {
    /*
      to update a post, must in the url has its id
      its gonna searching for the post
      generated a new slug if it was given a title
    */

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "To update a post, you must pass an the id on the url ",
      });
    }

    const { title, content } = req.body;

    if (!title && !content) {
      return res.status(400).json({
        error: "To update a post, you must provided title or a content",
      });
    }

    const blogpost = await getRepository(Blogpost);

    const post = await blogpost.findOne({
      id,
    });

    if (!post) {
      return res.status(404).json({
        error: "Post not found",
      });
    }
    /*
      in typeorm, to upate an post you must given its id
      and pass what u want to change
    */

    // Checking what was given to change
    // and updating
    try {
      if (title && content) {
        const slug = title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");

        await blogpost.update(post.id, {
          title,
          content,
          slug,
        });

        // retriving the new update post
        const updatePost = await blogpost.findOne({
          id,
        });

        return res.json({ updatePost });
      }
      if (title) {
        const slug = title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");

        await blogpost.update(post.id, {
          title,
          slug,
        });

        // retriving the new update post
        const updatePost = await blogpost.findOne({
          id,
        });

        return res.json({ updatePost });
      }
      if (content) {
        await blogpost.update(post.id, {
          content,
        });

        // retriving the new update post
        const updatePost = await blogpost.findOne({
          id,
        });

        return res.json({ updatePost });
      }
    } catch (e) {
      // if the user is tring to change the title for one that alredy exists
      return res.status(400).json({ errror: "Title alredy in use" });
    }
  }
}

export default BlogpostController;
