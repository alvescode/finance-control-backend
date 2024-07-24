import express, { Request, Response } from "express";
import "reflect-metadata";
import { AppDataSource } from "./database/data-source.js";
import { userRepository } from "./app/repositories/UserRepository.js";
import routers from "./app/routes/routes.js";

const server = express();
server.use(express.json());
server.use(routers);
const PORT = 3001;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source inicializado!");
    server.listen(PORT, () =>
      console.log(`Servidor rodando na porta ${PORT}.`),
    );
  })
  .catch((err) => {
    console.error("Erro durante a inicialização do Data Source:", err);
  });
