const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

// router inicia Router
const router = Router();

router.get('/pessoas', PessoaController.pegaTodasAsPessoas);
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa);

module.exports = router;