import { DataSource } from "typeorm";
import "reflect-metadata";
import User from "../app/entities/User.js";
import { CreateUsersTable1721751102172 } from "./migrations/1721751102172-CreateUsersTable.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "local_password",
  database: "local_database",
  synchronize: true,
  // logging  : true,
  entities: [User],
  migrations: [CreateUsersTable1721751102172],
  subscribers: [],
});
