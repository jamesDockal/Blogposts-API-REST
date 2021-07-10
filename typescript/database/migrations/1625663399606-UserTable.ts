import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1625654080752 implements MigrationInterface {
  // create the users table in a sqlite database

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "username",
            type: "varchar",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "password_hash",
            type: "varchar",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // drop the users table
    queryRunner.dropTable("users");
  }
}
