import express          from "express";
import User             from "../entities/user.js";
import {AppDataSource}  from "../database/data-source.js";
import {IsNull}         from "typeorm";
import {generateToken}  from "../utils/jwt.js";
import {generateNewPassword} from "../utils/login.js";
import {sendEmail} from "../helpers/nodemailer.js";

const route = express.Router();
const userRepository = AppDataSource.getRepository(User);

route.post("/", async(request, response) => {
   let {email, password} = request.body;
   email.toLowerCase();

   if(!email.includes("@")) {
      return response.status(400).send({response: "Email inválido."})
   };

   if(password.lenght < 6) {
      return response.status(400).send({response: "A senha deve possuir ao menos 6 caracteres."})
   };

   const user = await userRepository.findOneBy({
      email, password, deletedAt: IsNull()
   });

   if(!user) {
      return response.status(401).send({response: "Usuário ou senha inválidos."});
   };

   const token = generateToken({userId: user.id, user:user.name, email:user.email, typeUser:user.typeUser, createdAt: user.createdAt});
   return response.status(200).send({response: "Login efetuado com sucesso.", token});
});

route.put("/reset", async (request, response) => {
   const {email} = request.body;
   const user = await userRepository.findOneBy({email, deletedAt: IsNull()});

   if(!user) {
      return response.status(400).send({response: "Email inválido."})
   };

   const newPassword = generateNewPassword();

   await userRepository.update({email}, {password: newPassword});

   sendEmail(newPassword, user.email);

   return response.status(200).send({response: "Senha enviada para o email cadastrado."});
});

export default route;