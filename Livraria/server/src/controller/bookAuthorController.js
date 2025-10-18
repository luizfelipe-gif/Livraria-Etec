import express          from "express";
import BookAuthor       from "../entities/bookAuthor.js";
import Book             from "../entities/book.js";
import Author           from "../entities/author.js";
import {AppDataSource}  from "../database/data-source.js";
import {Like, IsNull}   from "typeorm";

const route = express.Router();
const bookAuthorRepository = AppDataSource.getRepository(BookAuthor);
const bookRepository = AppDataSource.getRepository(Book);
const authorRepository = AppDataSource.getRepository(Author);

route.get("/", async (request, response) => {
    const bookAuthors = await bookAuthorRepository.findBy({deletedAt:IsNull()});
    return response.status(200).send({"response": bookAuthors});
});

route.get("/:bookAuthor", async (request, response) => {
    const bookAuthorFound = await bookAuthorRepository.findBy({});
    return response.status(200).send({"response": bookAuthorFound});
});

route.post("/", async (request, response) => {
    const {bookId, authorId} = request.body;

    if (isNaN(bookId && authorId)) {
        return response.status(400).send({"response": "Os campos 'bookId' e 'authorId' devem ser numéricos."});
    }
    
    try {
        const author = await authorRepository.findOneBy({
            id: authorId,
            deletedAt: IsNull()
        });

        if(!author) {
            return response.status(400).send({"response": "Autor(a) informado não encontrado(a)."});
        }

        const book = await bookRepository.findOneBy({
            id: bookId,
            deletedAt: IsNull()
        });

        if(!book) {
            return response.status(400).send({"response": "Livro informado não encontrado."});
        }

        const newBookAuthor = bookAuthorRepository.create({author, book});
        await bookAuthorRepository.save(newBookAuthor);
        return response.status(201).send({"response": "Vínculo entre Autor e Livro realizado com sucesso."});
    } catch(err) {
        return response.status(500).send({"response": err});
    }
});

route.put("/", async (request, response) => { // linha 91: Dando erro, conferir o que pode ser
    const {bookId, authorId, newBookId, newAuthorId} = request.body;

    if (isNaN(bookId, authorId)) {
        return response.status(400).send({"response": "Os campos 'bookId' e 'authorId' devem ser numéricos."});
    }

    if (isNaN(newBookId, newAuthorId)) {
        return response.status(400).send({"response": "Os campos 'newBookId' e 'newAuthorId' devem ser numéricos."});
    }

    try {
        const updateBook = await bookRepository.findOneBy({
            bookId: newBookId,
            deletedAt: IsNull()
        });

        if(!updateBook) {
            return response.status(400).send({"response": "Livro informado não encontrado."});
        }

        const updateAuthor = await bookAuthorRepository.findOneBy({
            authorId: newAuthorId,
            deletedAt: IsNull()
        });

        if(!updateAuthor) {
            return response.status(400).send({"response": "Autor(a) informado não encontrado(a)."});
        }

        const updateBookAuthor = bookAuthorRepository.update({updateAuthor, updateBook});
        await bookAuthorRepository.save(updateBookAuthor);
        return response.status(201).send({"response": "Vínculo entre Autor e Livro atualizado com sucesso."});
    } catch(err) {
        return response.status(500).send({"response": "Erro ao atualizar o vínculo entre Autor e Livro."}); // Dando erro. Verificar o que pode ser
    }
});

route.delete("/", async (request, response) => {
    const {bookId, authorId} = request.query;

    if (isNaN(bookId, authorId)) {
        return response.status(400).send({"response": "Os campos 'bookId' e 'authorId' precisa ser numérico"});
    }
    await bookAuthorRepository.update({bookId, authorId}, {deletedAt: () => "CURRENT_TIMESTAMP"});
    return response.status(200).send({"response": "Vínculo entre Autor e Livro removido com sucesso."}); 
    // Dando erro pra deletar. Talvez outro metodo seria informar o ids como parametro (endereço), e não no corpo (insomnia).
});

export default route;