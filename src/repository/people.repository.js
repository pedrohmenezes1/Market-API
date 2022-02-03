/* eslint-disable class-methods-use-this */
const { People } = require('../models');

class PeopleRepository {
  async createPeople(people) {
    return People.create(people);
  }

  /**
   * Verifica se o e-mail foi recebido
   * @param {string} email - The people's email
   * @param {ObjectId} [excludePeopleId] - The id of the people to be excluded
   * @returns {Promise<boolean>}
   */
  async isEmailTaken(email, excludePeopleId) {
    const people = await People.findOne({ email, _id: { $ne: excludePeopleId } });
    return !!people;
  }
}

module.exports = new PeopleRepository();
