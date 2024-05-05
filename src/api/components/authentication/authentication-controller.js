const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');

/**
 * Handle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function login(request, response, next) {
  const { email, password } = request.body;

  try {
    const loginResult = await authenticationServices.login(email, password);
    return response.status(200).json(loginResult);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
};
