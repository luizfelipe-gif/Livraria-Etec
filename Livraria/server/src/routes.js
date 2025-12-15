import express              from "express";
import userController       from "./controller/userController.js";
import authorController     from "./controller/authorController.js";
import categoryController   from "./controller/categoryController.js";
import publisherController  from "./controller/publisherController.js";
import bookController       from "./controller/bookController.js";
import bookAuthorController from "./controller/bookAuthorController.js";
import loginController      from "./controller/loginController.js";
import uploadController      from "./controller/uploadController.js";
import { authenticate } from "./utils/jwt.js";

const routes = express();

// Arquivo pra referenciar os arquivos de cada tabela
routes.use("/user",                 userController);
routes.use("/author",               authorController);
routes.use("/category",             categoryController);
routes.use("/publisher",            publisherController);
routes.use("/book",                 bookController);
routes.use("/bookAuthor",           bookAuthorController);
routes.use("/login",                loginController);
routes.use("/upload", authenticate, uploadController);


export default routes;