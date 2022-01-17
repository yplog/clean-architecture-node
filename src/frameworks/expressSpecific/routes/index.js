const express = require('express');
const usersRouter = require('./users');
const productsRouter = require('./products');

module.exports = (dependencies) => {
  const routes = express.Router();

  const users = usersRouter(dependencies);
  const products = productsRouter(dependencies);

  routes.use('/users', users);
  routes.use('/products', products);

  return routes;
}