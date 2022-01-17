const express = require('express');
const usersRouter = require('./users');

module.exports = (dependencies) => {
  const routes = express.Router();

  const users = usersRouter(dependencies);

  routes.use('/users', users);

  return routes;
}