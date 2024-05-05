const { Category } = require('../../../models');

async function getCategories() {
  return Category.find();
}

async function getCategory(id) {
  return Category.findById(id);
}

async function createCategory(name, type, description, user_id) {
  return Category.create({
    name,
    type,
    description,
    user_id,
  });
}

async function updateCategory(id, name, type, description, user_id) {
  return Category.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name,
        type,
        description,
        user_id,
      },
    },
    { new: true }
  );
}

async function deleteCategory(id) {
  return Category.deleteOne({ _id: id });
}

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
