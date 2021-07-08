import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import User from "../../entities/UserEntity";
import hashPassword from "../../utils/hashPassword";

export class admUser1625663460313 implements MigrationInterface {
  // create an default user

  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = await getRepository(User);

    const user = await userRepository.create({
      username: "admin",
      password_hash: await hashPassword("admin"),
    });

    userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // delete the user created

    const userRepository = await getRepository(User);

    const user: any = await userRepository.findOne({ username: "admin" });
    await userRepository.delete(user);
  }
}
