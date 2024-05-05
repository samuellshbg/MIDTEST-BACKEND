const joi = require('joi');
const { type } = require('../../../models/categories-schema');

module.exports = {
  createCategory: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      type: joi.string().min(1).max(100).required().label('Type'),
      description: joi.string().min(1).max(100).required().label('Description'),
    },
  },

  updateCategory: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      type: joi.string().min(1).max(100).required().label('Type'),
      description: joi.string().min(1).max(100).required().label('Description'),
    },
  },
};
