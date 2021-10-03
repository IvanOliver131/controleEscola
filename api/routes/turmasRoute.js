const { Router } = require('express');
const TurmaController = require('../controllers/TurmaController');

// router inicia Router
const router = Router();

router
  //GETS
  .get('/turmas',  TurmaController.pegaTodasAsTurmas)
  .get('/turmas/:id', TurmaController.pegaUmaTurma)
  
  //POSTS
  .post('/turmas', TurmaController.criarTurma)
  .post('/turmas/:id/restaura', TurmaController.restauraTurma)
  
  //PUTS
  .put('/turmas/:id', TurmaController.atualizarTurma)
  
  //DELETES  
  .delete('/turmas/:id', TurmaController.deletarTurma)

module.exports = router;