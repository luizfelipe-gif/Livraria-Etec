import { EntitySchema } from "typeorm";

const bookAuthor = new EntitySchema({
    name: "BookAuthor",
    tableName: "bookAuthor",
    columns: {
        authorId: {primary: true, type: Number, nullable: false },
        bookId: {primary: true, type: Number, nullable: false },
        createdAt: {type: "datetime", nullable: false, default: () => "CURRENT_TIMESTAMP" },
        deletedAt: {type: "datetime", nullable: true },
    },
    relations: {
        author: { type: "many-to-one", target: "author", nullable: false },
        book: { type: "many-to-one", target: "book", nullable: false }
    },
});

export default bookAuthor;