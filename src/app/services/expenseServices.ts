import { Request, Response } from "express";
import Expense from "../entities/Expense.js";
import { expenseRepository } from "../repositories/ExpenseRepository.js";
import jwt from "jsonwebtoken";

const registerExpense = async (req: Request, res: Response) => {
  const { description, value, category, isIncome } = req.body;
  const userId = (req as any).user.id;

  console.log(isIncome);
  try {
    const expense = new Expense();
    expense.description = description;
    expense.value = parseFloat(value);
    expense.category = category;
    expense.userId = userId;
    expense.isIncome = isIncome;

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

const removeExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user.id;
  try {
    const expense = await expenseRepository.findOne({
      where: {
        id: parseInt(id),
        userId: userId,
      },
    });

    if (!expense) {
      return res.status(404).json({ message: "Despesa não encontrada." });
    }

    //remover do saldo atual

    await expenseRepository.delete(id);

    return res.status(200).json({ message: "Despesa removida com sucesso." });
  } catch (error) {
    console.error("Erro ao remover despesa:", error);
    return res.status(500).json({ message: "Erro ao remover despesa." });
  }
};
const getExpense = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  try {
    const expenses = await expenseRepository.find({
      where: {
        userId: userId,
      },
    });
    console.log(expenses[0].id);
    return res.status(200).json(expenses);
  } catch (error) {
    console.error("Erro ao buscar despesas:", error);
    return res.status(500).json({ message: "Erro ao buscar despesas." });
  }
};

const updateExpense = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  console.log(req.params);
  const { expenseId } = req.params;
  console.log("expenseId:", expenseId, "type:", typeof expenseId);
  const { description, value, category, isIncome } = req.body;

  try {
    const expense = await expenseRepository.findOne({
      where: {
        id: parseInt(expenseId),
        userId: userId,
      },
    });

    if (!expense) {
      return res.status(404).json({ message: "Despesa não encontrada." });
    }
    expense.description = description ?? expense.description;
    expense.value = value ?? expense.value;
    expense.category = category ?? expense.category;
    expense.isIncome = isIncome ?? expense.isIncome;

    await expenseRepository.save(expense);

    return res.status(200).json(expense);
  } catch (error) {
    console.error("Erro ao atualizar despesa:", error);
    return res.status(500).json({ message: "Erro ao atualizar despesa." });
  }
};

export { registerExpense, removeExpense, updateExpense, getExpense };
