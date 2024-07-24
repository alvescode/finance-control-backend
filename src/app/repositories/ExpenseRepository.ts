import { AppDataSource } from "../../database/data-source.js";
import Expense from "../entities/Expense.js";

export const expenseRepository = AppDataSource.getRepository(Expense);
