import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1721751102172 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableUsers = await queryRunner.getTable("users");
    if (!tableUsers) {
      await queryRunner.createTable(
        new Table({
          name: "users",
          columns: [
            {
              name: "id",
              type: "int",
              isPrimary: true,
              generationStrategy: "increment",
            },
            {
              name: "name",
              type: "varchar",
              length: "100",
              isNullable: false,
            },
            {
              name: "email",
              type: "varchar",
              length: "100",
              isNullable: false,
            },
            {
              name: "password",
              type: "varchar",
              length: "100",
              isNullable: false,
            },
            {
              name: "balance",
              type: "decimal",
              precision: 10,
              scale: 2,
              isNullable: false,
              default: 0,
            },
          ],
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
