import { Router } from "express";
import { userRouter } from "../controllers/UserController.js";
// import { expenseRouter } from "../controllers/ExpenseController.js";

const routers = Router();

routers.use("/user", userRouter);
// routers.use("/expense", expenseRouter);
export default routers;
