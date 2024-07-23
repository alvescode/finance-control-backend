import express, { Request, Response } from "express";
import mysql from "mysql2/promise";

const server = express();
const PORT = 3001;

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "local_password",
  database: "local_database",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

server.get("/status", async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection();
    res.status(200).json({
      message: "Servidor Funcionando.",
    });
    connection.release();
  } catch (err) {
    res.status(500).send("Servidor Inoperante.");
  }
});

server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}.`));
