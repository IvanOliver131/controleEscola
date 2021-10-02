const bodyParser = require('body-parser');
const pessoas = require('./pessoasRoute');

module.exports = app => {
  app.use(bodyParser.json());
  // Está usando as rotas de pessoa
  app.use(pessoas);
  
  // Apenas para teste
  //app.get('/', (req, res) => res.send('Olá!'));
}