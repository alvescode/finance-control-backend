import { Router } from "express";

import { register, login } from "../services/userServices.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

export { userRouter };
