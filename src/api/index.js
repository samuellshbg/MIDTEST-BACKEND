const express = require('express');

const authentication = require('./components/authentication/authentication-route');
const users = require('./components/users/users-route');
const categories = require('./components/categories/categories-route');

module.exports = () => {
  const app = express.Router();

  authentication(app);
  users(app);
  categories(app);

  return app;
};
