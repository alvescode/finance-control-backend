import { Router } from "express";
import registerExpense from "../services/expenseServices.js";
const expenseRouter = Router();

expenseRouter.post("/register", registerExpense);

export { expenseRouter };
