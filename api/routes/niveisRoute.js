const { Router } = require('express');
const NivelController = require('../controllers/NivelController');

// router inicia Router
const router = Router();

router
  //GETS
  .get('/niveis', NivelController.pegaTodosOsNiveis)
  .get('/niveis/:id', NivelController.pegaUmNivel)

  //POSTS 
  .post('/niveis', NivelController.criarNivel)
  .post('/niveis/:id/restaura', NivelController.restauraNivel)

  //PUTS 
  .put('/niveis/:id', NivelController.atualizarNivel)

  //DELETES  
  .delete('/niveis/:id', NivelController.deletarNivel)
  

module.exports = router;