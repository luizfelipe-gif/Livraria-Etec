import express from "express";
import Author from "../entities/author.js";
import { AppDataSource } from "../database/data-source.js";
import {Like, IsNull} from "typeorm";

const route = express.Router();
const authorRepository = AppDataSource.getRepository(Author);

route.get("/", async (request, response) => {
    const authors = await authorRepository.findBy({deletedAt:IsNull()});
    return response.status(200).send({"response": authors});
});

route.get("/:nameFound", async (request, response) => {
    const {nameFound} = request.params;
    const authorFound = await authorRepository.findBy({name: Like (`%${nameFound}%`)});
    return response.status(200).send({"response": authorFound});
});

route.post("/", async (request, response) => {
    const {name, birthday, nationality} = request.body;

    if (name.length < 3) {
        return response.status(400).send({"response": "O campo 'name' deve ter pelo menos três caracteres."});
    }

    if (birthday.length !== 10){
        return response.status(400).send({"response": "O campo 'birthday' deve ter o formato 'aaaa/mm/dd'."});
    }

    if (nationality.length < 5) {
        return response.status(400).send({"response": "O campo 'nationality' deve ter pelo menos cinco caracteres."});
    }

    try {
        const newAuthor = authorRepository.create({name, birthday, nationality});
        await authorRepository.save(newAuthor);
        return response.status(201).send("Autor cadastrado com sucesso.");
    } catch (err) {
        console.log(err);
        return response.status(500).send("Erro.");
    }
});

route.put('/:id', async (request, response) => {
    const {name, birthday, nationality} = request.body;
    const {id} = request.params;

    if (isNaN(id)){
        return response.status(400).send({"response": "O campo 'id' deve ser numérico."});
    }

    if (name.length < 1) {
        return response.status(400).send({"response": "O campo 'name' deve ter pelo menos um caractere."});
    }

    if (birthday.length !== 10){
        return response.status(400).send({"response": "O campo 'birthday' deve ter o formato 'dd/mm/aaaa'."});
    }

    if (nationality.length < 1) {
        return response.status(400).send({"response": "O campo 'nationality' deve ter pelo menos um caractere."});
    }
    
    try {
        await authorRepository.update({id}, {name, birthday, nationality}); // Serão dois blocos, um pra identificar o id, e outro pra atualizar as informações do Autor.
        return response.status(201).send({"message": "Autor atualizado com sucesso."});
    } catch (err) {
        console.log(err);
        return response.status(500).send("Erro.");
    }
});

route.delete('/:id', async (request, response) => {
    const {id} = request.params;

    if(isNaN(id)) {
        return response.status(400).send({"response": "O id precisa ser numérico"});
    }
    await authorRepository.update({id}, {deletedAt: () => "CURRENT_TIMESTAMP"});      // Soft delete
    //await authorRepository.delete({id}, {deletedAt: () => "CURRENT_TIMESTAMP"});    // Hard delete
    return response.status(200).send({"response": "Autor removido com sucesso."});
});

export default route;