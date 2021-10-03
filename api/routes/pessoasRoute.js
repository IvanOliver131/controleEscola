const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

// router inicia Router
const router = Router();

router
  // GETS
  .get('/pessoas', PessoaController.pegaTodasAsPessoas)
  .get('/pessoas/ativas', PessoaController.pegaPessoasAtivas)
  .get('/pessoas/:id', PessoaController.pegaUmaPessoa)
  .get('/pessoas/:estudanteId/matricula', PessoaController.pegaMatriculas)
  .get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula)
  .get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.pegaMatriculasPorTurma)
  .get('/pessoas/matricula/lotada', PessoaController.pegaTurmasLotadas)

  //POSTS 
  .post('/pessoas', PessoaController.criarPessoa)
  .post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
  .post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', PessoaController.restauraMatricula)
  .post('/pessoas/:estudanteId/matricula', PessoaController.criarUmaMatricula)
  .post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa)

  //PUTS
  .put('/pessoas/:id', PessoaController.atualizarPessoa)
  .put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizarMatricula)

  //DELETES
  .delete('/pessoas/:id', PessoaController.deletarPessoa)
  .delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.deletarMatricula)

module.exports = router;


