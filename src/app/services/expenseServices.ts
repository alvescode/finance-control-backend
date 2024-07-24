import { Request, Response } from "express";
import Expense from "../entities/Expense.js";
import { expenseRepository } from "../repositories/ExpenseRepository.js";
import jwt from "jsonwebtoken";

const registerExpense = async (req: Request, res: Response) => {
  console.log("chegou aqui", req.body);
  const { description, amount, category } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, "secretkey") as { id: number };
    const userId = decoded.id;

    console.log("Token decodificado:", decoded);

    const expense = new Expense();
    expense.description = description;
    expense.value = parseFloat(amount);
    expense.category = category;
    expense.userId = userId;

    await expenseRepository.save(expense);

    return res
      .status(201)
      .json({ message: "Despesa registrada com sucesso!", expense });
  } catch (error) {
    console.error("Erro ao registrar despesa:", error);

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Token inválido." });
    }

    return res.status(500).json({ message: "Erro ao registrar despesa." });
  }
};

export default registerExpense;
