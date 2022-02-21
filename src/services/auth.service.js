/* eslint-disable no-return-await */
const { authRepository } = require('../repository');

/**
 * Authenticação com email e senha :)
 * @param {string} password
 * @returns {Promise<People>}
 */
const authenticate = async (password) => {
  return await authRepository.verifyPassword(password);
};

module.exports = {
  authenticate,
};
