import express             from "express";
import User                from "../entities/user.js";
import Profile             from "../entities/profile.js";
import { AppDataSource }   from "../database/data-source.js";
import { Like, IsNull }    from "typeorm";
import { authenticate }    from "../utils/jwt.js";

const route = express.Router();
const userRepository = AppDataSource.getRepository(User);
const profileRepository = AppDataSource.getRepository(Profile);

route.get("/", authenticate, async (request, response) => {
   const users = await userRepository.findBy({deletedAt:IsNull()});
   return response.status(200).send({response: users});
});

route.get("/:userProfile", authenticate, async (request, response) => {
   const {userProfile} = request.params;
   const imageFound = await profileRepository.findOne({where: {user: {id: userProfile}}, relations: ["user"]});
   // console.log("/teste/:userProfile", imageFound);
   return response.status(200).send({response: imageFound});
});

route.post("/", async (request, response) => {
   const {name, email, password, typeUser} = request.body;

   if (name.length < 3) {
      return response.status(400).send({response: "O nome deve ter pelo menos três caracteres."});
   };

   if (!email.includes("@")) {
      return response.status(400).send({response: "O e-mail está no padrão incorreto."});
   };

   if (password.length < 6) {
      return response.status(400).send({response: "A senha deve conter pelo menos 6 caracteres."});
   };

   if (typeUser.toLowerCase() != "admin" && typeUser.toLowerCase() != "comum"){
      return response.status(400).send({response: 'O tipo de usuário deve ser "admin" ou "comum".'});
   };

   try {
      const newUser = userRepository.create({name, email, password, typeUser});
      await userRepository.save(newUser);
      
   } catch (err) {
      console.log(err);
      return response.status(500).send("Erro interno do servidor.");
   };

   return response.status(201).send({message: "Usuário cadastrado com sucesso."});
});

route.put('/:id', async (request, response) => {
   const {name, password, email, typeUser} = request.body;
   const {id} = request.params;

   if (isNaN(id)){
      return response.status(400).send({response: "O campo 'id' deve ser numérico."});
   };

   if (name.length < 1) {
      return response.status(400).send({response: "O campo 'name' deve ter pelo menos um caractere."});
   };

   if (!email.includes("@")){
      return response.status(400).send({response: "O campo 'email' está no padrão incorreto."});
   };

   if (password.length < 6){
      return response.status(400).send({response: "A senha deve conter pelo menos 6 caracteres."});
   };

   if (typeUser.toLowerCase() != "admin" && typeUser.toLowerCase() != "comum"){
      return response.status(400).send({response: 'O tipo de usuário deve ser "admin" ou "comum".'});
   };
   
   try {
      await userRepository.update({id}, {name, password, email, typeUser}); // Serão dois blocos, um pra identificar o id, e outro pra atualizar as informações do Usuário.
      return response.status(200).send({message: "Usuário atualizado com sucesso."});
   } catch (err) {
      console.log(err);
      return response.status(500).send("Erro.");
   };
});

route.delete('/:id', async (request, response) => {
   const {id} = request.params;

   if(isNaN(id)) {
      return response.status(400).send({response: "O id precisa ser numérico"});
   };
   
   await userRepository.update({id}, {deletedAt: () => "CURRENT_TIMESTAMP"});      // Soft delete
   //await userRepository.delete({id}, {deletedAt: () => "CURRENT_TIMESTAMP"});    // Hard delete
   return response.status(200).send({response: "Usuário removido com sucesso."});
});

export default route;