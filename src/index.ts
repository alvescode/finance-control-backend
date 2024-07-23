import express, { Request, Response } from "express";
import routes from "./routes.js";
import "reflect-metadata";
import { AppDataSource } from "./database/data-source.js";

const server = express();
server.use(express.json());
server.use(routes);

const PORT = 3001;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    server.listen(PORT, () =>
      console.log(`Servidor rodando na porta ${PORT}.`),
    );
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
