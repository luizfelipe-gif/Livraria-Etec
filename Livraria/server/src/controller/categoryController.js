import express          from "express";
import Category         from "../entities/category.js";
import {AppDataSource}  from "../database/data-source.js";
import {Like, IsNull}   from "typeorm";

const route = express.Router();
const categoryRepository = AppDataSource.getRepository(Category);

route.get("/", async (request, response) => {
    const categories = await categoryRepository.findBy({deletedAt:IsNull()});
    return response.status(200).send({"response": categories});
});

route.get("/:nameFound", async (request, response) => {
    const {nameFound} = request.params;
    const categoryFound = await categoryRepository.findBy({name: Like (`%${nameFound}%`)});
    return response.status(200).send({"response": categoryFound});
});

route.post("/", async (request, response) => {
    const {name} = request.body;

    if (name.length < 1) {
        return response.status(400).send({"response": "O campo 'name' deve ter pelo menos um caractere."});
    }

    try {
        const newCategory = categoryRepository.create({name});
        await categoryRepository.save(newCategory);
        return response.status(201).send("Categoria cadastrada com sucesso.");
    } catch (err) {
        console.log(err);
        return response.status(500).send("Erro.");
    }
});

route.put('/:id', async (request, response) => {
    const {name} = request.body;
    const {id} = request.params;

    if (isNaN(id)){
        return response.status(400).send({"response": "O campo 'id' deve ser numérico."});
    }

    if (name.length < 1) {
        return response.status(400).send({"response": "O campo 'name' deve ter pelo menos um caractere."});
    }
    
    try {
        await categoryRepository.update({id}, {name}) // Serão dois blocos, um pra identificar o id, e outro pra atualizar as informações da Categoria.
        return response.status(200).send({"message": "Categoria atualizada com sucesso."});
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
    await categoryRepository.update({id}, {deletedAt: () => "CURRENT_TIMESTAMP"});      // Soft delete
    //await categoryRepository.delete({id}, {deletedAt: () => "CURRENT_TIMESTAMP"});    // Hard delete
    return response.status(200).send({"response": "Categoria removido com sucesso."});
});

export default route;