import { EntityRepository, Repository } from "typeorm";
import Blogpost from "../entities/BlogpostEntity";

@EntityRepository(Blogpost)
class BlogpostRepository extends Repository<Blogpost> {}

export default BlogpostRepository;
