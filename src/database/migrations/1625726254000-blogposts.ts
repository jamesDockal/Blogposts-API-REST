import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class blogposts1625726254000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "blogposts",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "title",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "content",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "slug",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_by",
            type: "varchar",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: "FK_created_by_user",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["created_by"],
          },
        ],
      })
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("blogposts");
  }
}
