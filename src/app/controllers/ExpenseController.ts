import { Router } from "express";
import {
  registerExpense,
  getExpense,
  removeExpense,
  updateExpense,
} from "../services/expenseServices.js";
import authenticateToken from "../middlewares/authMiddleware.js";
const expenseRouter = Router();

//Middleware de Autenticação
expenseRouter.use(authenticateToken);

expenseRouter.post("/register", registerExpense);
expenseRouter.get("/view", getExpense);
expenseRouter.delete("/:id", removeExpense);
expenseRouter.put("/edit/:expenseId", updateExpense);

export { expenseRouter };
