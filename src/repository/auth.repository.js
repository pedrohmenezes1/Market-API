/* eslint-disable no-return-await */
/* eslint-disable class-methods-use-this */
const People = require('../models/people.model');

class AuthRepository {
  /**
   * Verifica senha
   * @param {string} senha
   * @returns {Promise<People>}
   */
  async verifyPassword(password) {
    return await People.findOne(password).select('+senha');
  }
}
module.exports = new AuthRepository();
