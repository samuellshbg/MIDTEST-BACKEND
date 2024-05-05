const categoriesService = require('./categories-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const mongoose = require('mongoose');

async function getCategories(request, response, next) {
  try {
    const categories = await categoriesService.getCategories();
    return response.status(200).json(categories);
  } catch (error) {
    return next(error);
  }
}

async function getCategory(request, response, next) {
  try {
    if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Category not found'
      );
    }
    const category = await categoriesService.getCategory(request.params.id);

    if (!category) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Category not found'
      );
    }

    return response.status(200).json(category);
  } catch (error) {
    return next(error);
  }
}

async function createCategory(request, response, next) {
  const { name, type, description } = request.body;

  const user_id = request.user.id;

  try {
    const category = await categoriesService.createCategory(
      name,
      type,
      description,
      user_id
    );
    return response.status(201).json({ name, type, description });
  } catch (error) {
    return next(error);
  }
}

async function updateCategory(request, response, next) {
  const id = request.params.id;
  const { name, type, description } = request.body;

  try {
    const success = await categoriesService.updateCategory(
      id,
      name,
      type,
      description
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Category not found'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

async function deleteCategory(request, response, next) {
  try {
    const id = request.params.id;

    const success = await categoriesService.deleteCategory(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Category not found'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
