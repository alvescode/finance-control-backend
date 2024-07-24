import { Router } from "express";
import { userRouter } from "../controllers/UserController.js";

const routers = Router();

routers.use("/user", userRouter);

export default routers;
