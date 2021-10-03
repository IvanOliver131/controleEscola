const { Router } = require('express');
const TurmaController = require('../controllers/TurmaController');

// router inicia Router
const router = Router();

router
  .get('/turmas',  TurmaController.pegaTodasAsTurmas)
  .get('/turmas/:id', TurmaController.pegaUmaTurma)
  .post('/turmas', TurmaController.criarTurma)
  .put('/turmas/:id', TurmaController.atualizarTurma)
  .delete('/turmas/:id', TurmaController.deletarTurma)
  .post('/turmas/:id/restaura', TurmaController.restauraTurma)

module.exports = router;