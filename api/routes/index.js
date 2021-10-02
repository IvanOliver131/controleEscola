const bodyParser = require('body-parser');

const pessoas = require('./pessoasRoute');
const niveis = require('./niveisRoute');
const turmas = require('./turmasRoute');

module.exports = app => {
  // Está usando as rotas de pessoas, niveis e turmas
  app.use(bodyParser.json(),
    bodyParser.urlencoded({extended: false}),
    pessoas,
    niveis,
    turmas,
  )
  
  // Apenas para teste
  //app.get('/', (req, res) => res.send('Olá!'));
}