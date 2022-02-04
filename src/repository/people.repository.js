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

  async findPeople(people) {
    const { page = 1, limit = 100, ...query } = people;
    return People.paginate(
      { ...query },
      { limit: Number(limit), page: Number(page), skip: (Number(page) - 1) * Number(limit) }
    );
  }

  async getPeopleId(id) {
    return People.findById(id);
  }

  async findPeopleById(id) {
    return this.getPeopleId(id);
  }

  async updatePeopleById(id) {
    return this.getPeopleId(id);
  }

  async getPeopleByEmail(email) {
    return People.findOne({ email });
  }
}

module.exports = new PeopleRepository();
