const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

// app está usando o express
const app = express();
const port = 3000;

// routes está usando app
routes(app);

app.listen(port, () => console.log(`Servidor está rodando na porta ${port}`));

module.exports = app;
