import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import User from "../../entities/UserEntity";

export class admUser1625663460313 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = await getRepository(User);

    const user = await userRepository.create({
      username: "admin",
      password_hash: "admin",
    });

    userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepository = await getRepository(User);

    const user: any = await userRepository.findOne({ username: "admin" });
    await userRepository.delete(user);
  }
}
