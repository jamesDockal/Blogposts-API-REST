import { Router } from "express";

const BlogRoutes = Router();

BlogRoutes.get("/", (req, res) => res.send("ok"));

export default BlogRoutes;
