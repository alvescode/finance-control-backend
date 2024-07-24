import User from "../entities/User.js";
import { AppDataSource } from "../../database/data-source.js";

export const userRepository = AppDataSource.getRepository(User);
