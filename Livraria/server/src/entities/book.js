import { EntitySchema } from "typeorm";

const book = new EntitySchema({
    name: "Book",
    tableName: "book",
    columns: {
        id: { primary: true, type: "int", generated: "increment" }, // Perguntar se a ID será autoincrement
        bookName: { type: "varchar", length: 45, nullable: false },
        publication: { type: "date", nullable: false },
        pages: { type: "int", nullable: false },
        price: { type: "decimal", precision: 6, scale: 2, nullable: false },
        createdAt: { type: "datetime", nullable: false, default: () => "CURRENT_TIMESTAMP" },
        deletedAt: { type: "datetime", nullable: true },
    },
    relations: {
        category: { type: "many-to-one", target: "category", nullable: false },
        publisher: { type: "many-to-one", target: "publisher", nullable: false }
    },
});

export default book;