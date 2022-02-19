const { People } = require('../models');

/**
 * Verifica senha
 * @param {Object} password
 * @returns {Promise<People>}
 */
const verifyPassword = async (password) => {
  const auth = await People.findOne(password).select('+senha');
  return auth;
};

module.exports = {
  verifyPassword,
};
