import { Router } from "express";
import {
  registerExpense,
  getExpense,
  removeExpense,
  updateExpense,
} from "../services/expenseServices.js";
const expenseRouter = Router();

expenseRouter.post("/register", registerExpense);
expenseRouter.get("/view", getExpense);
expenseRouter.delete("/:id", removeExpense);
expenseRouter.put("/edit/:expenseId", updateExpense);

export { expenseRouter };
