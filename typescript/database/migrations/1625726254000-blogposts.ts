import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class blogposts1625726254000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    /*
      create a blogposts table
      it has a relation with the user table
      created_by column references to the user id
    */
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
            isUnique: true,
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
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: "FK_cretedBy_user",
            referencedTableName: "users",
            referencedColumnNames: ["username"],
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
