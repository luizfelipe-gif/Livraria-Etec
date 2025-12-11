import express          from "express";
import Publisher        from "../entities/publisher.js";
import {AppDataSource}  from "../database/data-source.js";
import {Like, IsNull}   from "typeorm";

const route = express.Router();
const publisherRepository = AppDataSource.getRepository(Publisher);

route.get("/", async (request, response) => {
   const publishers = await publisherRepository.findBy({deletedAt:IsNull()});
   return response.status(200).send({response: publishers});
});

route.get("/:cnpjFound", async (request, response) => {
   const {cnpjFound} = request.params;
   const publisherFound = await publisherRepository.findBy({cnpj: Like (`%${cnpjFound}%`)});
   return response.status(200).send({response: publisherFound});
});

route.post("/", async (request, response) => {
   const {name, cnpj, email} = request.body;

   if (name.length < 1) {
      return response.status(400).send({response: "Campo 'name' deve ter pelo menos um caractere."});
   }

   if (cnpj.length !== 14){
      return response.status(400).send({response: "O CNPJ deve conter 14 caracteres."});
   }

   if (!email.includes("@")){
      return response.status(400).send({response: "Campo 'email' está no padrão incorreto."});
   }

   try {
      const newPublisher = publisherRepository.create({name, cnpj, email});
      await publisherRepository.save(newPublisher);
      return response.status(201).send("Editora cadastrado com sucesso.");
   } catch (err) {
      console.log(err);
      return response.status(500).send("Erro.");
   }
});

route.put('/:id', async (request, response) => {
   const {name, cnpj, email} = request.body;
   const {id} = request.params;

   if (isNaN(id)){
      return response.status(400).send({response: "O campo 'id' deve ser numérico."});
   }

   if (name.length < 1) {
      return response.status(400).send({response: "O campo 'name' deve ter pelo menos um caractere."});
   }

   if (cnpj.length !== 14){
      return response.status(400).send({response: "O CNPJ deve conter 14 caracteres."});
   }

   if (!email.includes("@")){
      return response.status(400).send({response: "O campo 'email' está no padrão incorreto."});
   }

   try {
      await publisherRepository.update({id}, {name, cnpj, email}) // Serão dois blocos, um pra identificar o id, e outro pra atualizar as informações da Editora.
      return response.status(200).send({message: "Editora atualizado com sucesso."});
   } catch (err) {
      console.log(err);
      return response.status(500).send("Erro.");
   }
});

route.delete('/:id', async (request, response) => {
   const {id} = request.params;

   if(isNaN(id)) {
      return response.status(400).send({response: "O id precisa ser numérico"});
   }

   await publisherRepository.update({id}, {deletedAt: () => "CURRENT_TIMESTAMP"});      // Soft delete
   //await publisherRepository.delete({id}, {deletedAt: () => "CURRENT_TIMESTAMP"});    // Hard delete
   
   return response.status(200).send({response: "Editora removido com sucesso."});
});

export default route;