import express from "express";
import routes from "./routes.js";
import { AppDataSource } from "./database/data-source.js";
import cors from 'cors';

const server = express();
server.use(express.json());
server.use(cors());

server.use("/", routes);

AppDataSource.initialize().then(async () => {
    console.log("Banco de dados conectado!");

    server.listen(3333, () => { // Porta 3333 se refere ao Express
        console.log("O servidor irá funcionar!");
    });
});