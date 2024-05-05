const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const categoriesControllers = require('./categories-controller');
const categoriesValidator = require('./categories-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/categories', route);

  // Get list of categories
  route.get('/', authenticationMiddleware, categoriesControllers.getCategories);

  // Create category
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(categoriesValidator.createCategory),
    categoriesControllers.createCategory
  );

  // Get category detail
  route.get(
    '/:id',
    authenticationMiddleware,
    categoriesControllers.getCategory
  );

  // Update category
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(categoriesValidator.updateCategory),
    categoriesControllers.updateCategory
  );

  // Delete category
  route.delete(
    '/:id',
    authenticationMiddleware,
    categoriesControllers.deleteCategory
  );
};
