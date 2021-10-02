const bodyParser = require('body-parser');
const { restart } = require('nodemon');

module.exports = app => {
  app.use(bodyParser.json());

  app.get('/', (req, res) => res.send('Olá!'));
}