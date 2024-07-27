import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./database/data-source.js";
import routers from "./app/routes/routes.js";
import cors from "cors";
import dotenv from "dotenv";

const server = express();
server.use(cors());
server.use(express.json());
server.use(routers);

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

console.log(result.parsed);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source inicializado!");
    server.listen(process.env.PORT, () =>
      console.log(`Servidor rodando na porta ${process.env.PORT}.`),
    );
  })
  .catch((err) => {
    console.error("Erro durante a inicialização do Data Source:", err);
  });
