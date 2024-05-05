const { User } = require('../../../models');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers(page, size, search = '', sort = '') {
  const query = search
    ? {
        [search.split(':')[0]]: { $regex: search.split(':')[1], $options: 'i' },
      }
    : {};

  const totalUsers = await User.countDocuments(query);
  const skip = (page - 1) * size;

  const sortOptions = sort
    ? { [sort.split(':')[0]]: sort.split(':')[1] === 'desc' ? -1 : 1 }
    : {};

  const users = await User.find(query).skip(skip).limit(size).sort(sortOptions);

  const totalPages = Math.ceil(totalUsers / size);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  const results = users.map(({ id, name, email }) => ({ id, name, email }));

  return {
    page_number: Number(page),
    page_size: Number(size),
    count: users.length,
    total_pages: totalPages,
    has_previous_page: hasPreviousPage,
    has_next_page: hasNextPage,
    data: results,
  };
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Get user by email to prevent duplicate email
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
};
