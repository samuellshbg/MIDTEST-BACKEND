const categoriesRepository = require('./categories-repository');

async function getCategories() {
  return await categoriesRepository.getCategories();
}

async function getCategory(id) {
  const category = await categoriesRepository.getCategory(id);

  if (!category) {
    return null;
  }

  return {
    id: category.id,
    name: category.name,
    type: category.type,
    description: category.description,
  };
}

async function createCategory(name, type, description, user_id) {
  return await categoriesRepository.createCategory(
    name,
    type,
    description,
    user_id
  );
}

async function updateCategory(id, name, type, description) {
  const category = await categoriesRepository.getCategory(id);

  if (!category) {
    return null;
  }

  try {
    await categoriesRepository.updateCategory(id, name, type, description);
  } catch (error) {
    return null;
  }

  return true;
}

async function deleteCategory(id) {
  const category = await categoriesRepository.getCategory(id);

  if (!category) {
    return null;
  }

  try {
    await categoriesRepository.deleteCategory(id);
  } catch (error) {
    return null;
  }

  return true;
}

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
