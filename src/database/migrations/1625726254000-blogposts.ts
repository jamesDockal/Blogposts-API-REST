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
            isNullable: false,
          },
          {
            name: "content",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "slug",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "created_by",
            type: "varchar",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: "FK_cretedBy_user",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["created_by"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("blogposts");
  }
}
