/* eslint-disable class-methods-use-this */
const { People } = require('../models');

class PeopleRepository {
  async createPeople(people) {
    return People.create(people);
  }
}

module.exports = new PeopleRepository();
