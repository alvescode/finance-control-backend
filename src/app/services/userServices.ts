import { Request, Response } from "express";
import { userRepository } from "../repositories/UserRepository.js";
import bcrypt from "bcrypt";
import IUser from "../interfaces/IUser.js";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
  const { name, email, password }: IUser = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await userRepository.save(newUser);

    return res.status(201).json({ message: "Usuário criado" });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar usuário", error });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      return res.status(400).json({ message: "Email ou Senha Inválidos" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Email ou Senha Inválidos" });
    }

    const token = jwt.sign({ id: user.id }, "secretkey", { expiresIn: "1h" });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao logar.", error });
  }
};

export { register, login };
