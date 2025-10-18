import { EntitySchema } from "typeorm";

const author = new EntitySchema({
    name: "Author",
    tableName: "author",
    columns: {
        id: {primary: true, type: "int", generated: "increment"},
        name: {type: "varchar", length: 45, nullable: false},
        birthday: {type: "date", nullable: false},
        nationality: {type: "varchar", length: 45, nullable: false},
        createdAt: {type: "datetime", nullable: false, default: () => "CURRENT_TIMESTAMP"},
        deletedAt: {type: "datetime", nullable: true}
    }
});

export default author;