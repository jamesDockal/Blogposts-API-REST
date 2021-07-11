import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import Blogpost from "../../entities/BlogpostEntity";

export class defaultPosts1625809397391 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    /*
      creating 3 default posts
      and saving on blogpost table
    */
    const blogpostRepository = getRepository(Blogpost);

    const post1 = await blogpostRepository.create({
      created_by: "admin",
      title: "React, getting started!",
      content: "introduce to the front-end framework React.js",
      slug: "react-getting-started",
    });
    const post2 = await blogpostRepository.create({
      created_by: "admin",
      title: "Node.js first steps",
      content: "lets learn how to install Node and run a server!",
      slug: "nodejs-first-steps",
    });
    const post3 = await blogpostRepository.create({
      created_by: "admin",
      title: "What is a Relational database?",
      content: "The first thing you need to know is, what is a database?",
      slug: "what-is-a-relational-database",
    });

    await blogpostRepository.save(post1);
    await blogpostRepository.save(post2);
    await blogpostRepository.save(post3);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // deleting the 3 post if necessary

    const blogpostRepository = await getRepository(Blogpost);
    const post1: any = await blogpostRepository.findOne({
      created_by: "admin",
    });
    await blogpostRepository.delete(post1);

    const post2: any = await blogpostRepository.findOne({
      created_by: "admin",
    });
    await blogpostRepository.delete(post2);

    const post3: any = await blogpostRepository.findOne({
      created_by: "admin",
    });

    await blogpostRepository.delete(post3);
  }
}
