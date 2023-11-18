const express = require('express');
const categoryRouter = require('./categories.router');


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  app.use('/categorias',categoryRouter);
}

module.exports = routerApi;
