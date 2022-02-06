/* eslint-disable no-return-await */
const AuthRepository = require('../repository/auth.repository');

/**
 * Authenticação com email e senha :)
 * @param {string} password
 * @returns {Promise<People>}
 */
const authenticate = async (password) => {
  return await AuthRepository.verifyPassword(password);
};

module.exports = {
  authenticate,
};
