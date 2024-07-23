import express, { Request, Response } from "express";
import database from "./infra/database.js";
import routes from "./routes.js";
import "reflect-metadata";
const server = express();
server.use(express.json());
server.use(routes);

const PORT = 3001;

server.get("/status", async (req: Request, res: Response) => {
  try {
    const connection = await database.getConnection();
    res.status(200).json({
      message: "Servidor Funcionando.",
    });
    connection.release();
  } catch (err) {
    res.status(500).send("Servidor Inoperante.");
  }
});

server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}.`));
