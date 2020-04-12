const express = require("express");
const cors = require("cors");
const {uuid, isUuid} =  require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
// repositories : Variavel principal ,  repository : utilizarei nos arrey
// findrepository : variavel para bsucar dentro do array

app.get("/repositories", (request, response) => {
  return response.json(repositories);
 
});

app.post("/repositories", (request, response) => {
  const { title, url , techs} =  request.body;
  const repository = { 
    id: uuid(),
    title,
    url,
    techs,
    likes:0,
  };
  repositories.push(repository);
  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs, likes} =  request.body;
  const findrepositories =  repositories.findIndex(repository=> repository.id === id);
  if (findrepositories === -1){
    return response.status(400).json({error : "ID not exist or invalid"})
  };
  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[findrepositories].likes,

  };
   repositories[findrepositories] = repository;
   return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } =  request.params;
  const findrepositories =  repositories.findIndex(repository => repository.id === id);
  if( findrepositories >= 0) {
    repositories.splice(findrepositories,1);
  }
  else{
    return response.status(400).json({erro : " ID not exist"})
  }
  return response.status(204).send()
  });

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const { likes} =  request.body
  const findrepositories =  repositories.findIndex(repository=> repository.id === id);
  if (findrepositories < 0){
    return response.status(400).json({error : "ID not exist or invalid"})
  };
  repositories[findrepositories].likes++;
  return response.json(repositories[findrepositories]);
});

module.exports = app;
