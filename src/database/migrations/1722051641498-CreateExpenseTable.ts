import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateExpenseTable1721841928969 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExpense = await queryRunner.getTable("expense");
    if (!tableExpense) {
      await queryRunner.createTable(
        new Table({
          name: "expense",
          columns: [
            {
              name: "id",
              type: "int",
              isPrimary: true,
              isGenerated: true,
              generationStrategy: "increment",
            },
            {
              name: "userId",
              type: "int",
              isNullable: false,
            },
            {
              name: "description",
              type: "varchar",
              length: "150",
              isNullable: false,
            },
            {
              name: "value",
              type: "decimal",
              precision: 10,
              scale: 2,
              isNullable: false,
            },
            {
              name: "category",
              type: "varchar",
              length: "30",
              isNullable: false,
            },
            {
              name: "isIncome",
              type: "boolean",
              isNullable: false,
              default: false,
            },
          ],
        }),
      );
    }

    await queryRunner.createForeignKey(
      "expense",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("expense");
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("userId") !== -1,
    );

    if (foreignKey) {
      await queryRunner.dropForeignKey("expense", foreignKey);
    }

    await queryRunner.dropTable("expense");
  }
}
