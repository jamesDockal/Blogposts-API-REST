import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1625654080752 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "username",
            type: "varchar",
          },
          {
            name: "password_hash",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("users");
  }
}
