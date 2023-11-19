const express = require('express');
const categoryRouter = require('./categories.router');
const userRouter = require('./usuarios.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  app.use('/api/v1/categorias',categoryRouter);
  app.use('/api/v1/usuarios', userRouter);

}

module.exports = routerApi;
