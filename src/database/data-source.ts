import { DataSource } from "typeorm";
import "reflect-metadata";
import User from "../app/entities/User.js";
import Expense from "../app/entities/Expense.js";
import { CreateUsersTable1721751102172 } from "./migrations/1721867235075-CreateUsersTable.js";
import { CreateExpenseTable1721841928969 } from "./migrations/1721867239409-CreateExpenseTable.js";
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "local_password",
  database: "local_database",
  synchronize: true,
  // logging  : true,
  entities: [User, Expense],
  migrations: [CreateUsersTable1721751102172, CreateExpenseTable1721841928969],
  subscribers: [],
});
