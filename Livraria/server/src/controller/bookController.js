import express          from "express";
import Book             from "../entities/book.js";
import Category         from "../entities/category.js";
import Publisher        from "../entities/publisher.js";
import {AppDataSource}  from "../database/data-source.js";
import {Like, IsNull}   from "typeorm";

const route = express.Router();
const bookRepository = AppDataSource.getRepository(Book);
const categoryRepository = AppDataSource.getRepository(Category);
const publisherRepository = AppDataSource.getRepository(Publisher);

route.get("/", async (request, response) => {
    // const books = await bookRepository.findBy({deletedAt:IsNull()});
    // const categories = await categoryRepository.findBy({deletedAt:IsNull()});
    // categories.forEach(categoryRepository => {
    //     console.log(`${categoryRepository.name}`)
    // });
    
    // return response.status(200).json({
    //     books, categoryNames
    // });

    const books = await bookRepository.findBy({deletedAt:IsNull()});
        return response.status(200).send({"response": books});
});

route.get("/:bookName", async (request, response) => {
    const {bookName} = request.params;
    const bookFound = await bookRepository.findBy({bookName: Like (`%${bookName}%`)});
    return response.status(200).send({"response": bookFound});
});

route.post("/", async (request, response) => {
    const {bookName, publication, pages, price, publisherId, categoryId} = request.body;

    if (bookName.length < 1) {
        return response.status(400).send({"response": "O campo 'bookName' deve ter pelo menos um caractere."});
    }

    if (publication.length !== 10) {
        return response.status(400).send({"response": "O campo 'publication' deve ter o formato 'aaaa/mm/dd'."});
    }
    
    if (isNaN(pages)) {
        return response.status(400).send({"response": "O campo 'page' deve ser numérico."});
    }

    // Conferir se price será numérico ou outro tipo de dado
    if (isNaN(price)) {
        return response.status(400).send({"response": "O campo 'price' precisa ser numérico."});
    }

    // Conferir aqui se essas IDs precisam ser validadas.
    if (isNaN(publisherId)){
        return response.status(400).send({"response": "O campo 'publisherId' deve ser numérico."});
    }

    if (isNaN(categoryId)){
        return response.status(400).send({"response": "O campo 'categoryId' deve ser numérico."});
    }

    try {
        const publisher = await publisherRepository.findOneBy({
            id: publisherId,
            deletedAt: IsNull()
        });

        if(!publisher) {
            return response.status(400).send({"response": "Editora informada não encontrada."});
        }

        const category = await categoryRepository.findOneBy({
            id: categoryId,
            deletedAt: IsNull()
        });

        if(!category) {
            return response.status(400).send({"response": "Categoria informada não encontrada."});
        }

        const newBook = bookRepository.create({bookName, publication, pages, price, publisher, category});
        await bookRepository.save(newBook);
        return response.status(201).send({"response": "Livro cadastrado com sucesso."});
    } catch(err) {
        return response.status(500).send({"response": err});
    }
});

route.put('/:id', async (request, response) => {
    const {bookName, publication, pages, price} = request.body;
    const {id} = request.params;

    if (isNaN(id)){
        return response.status(400).send({"response": "O campo 'id' deve ser numérico."});
    }

    if (bookName.length < 1) {
        return response.status(400).send({"response": "O campo 'bookName' deve ter pelo menos um caractere."});
    }

    if (publication.length !== 10) {
        return response.status(400).send({"response": "O campo 'publication' deve ter o formato 'aaaa/mm/dd'."})
    }
    
    if (isNaN(pages)) {
        return response.status(400).send({"response": "O campo 'page' deve ser numérico."})
    }

    // Conferir se price será numérico ou outro tipo de dado
    if (isNaN(price)) {
        return response.status(400).send({"response": "O campo 'price' precisa ser numérico."})
    }

    try {
        await bookRepository.update({id}, {bookName, publication, pages, price})
        return response.status(200).send({"message": "Livro atualizado com sucesso."})
    } catch (err) {
        console.log(err);
        return response.status(500).send("Erro.");
    }
});

route.delete('/:id', async (request, response) => {
    const {id} = request.params;

    if (isNaN(id)) {
        return response.status(400).send({"response": "O id precisa ser numérico"});
    }
    await bookRepository.update({id}, {deletedAt: () => "CURRENT_TIMESTAMP"});      // Soft delete
    //await bookRepository.delete({id}, {deletedAt: () => "CURRENT_TIMESTAMP"});    // Hard delete
    return response.status(200).send({"response": "Livro removido com sucesso."});
});

export default route;