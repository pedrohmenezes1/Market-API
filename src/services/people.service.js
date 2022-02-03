const httpStatus = require('http-status');
const PeopleRepository = require('../repository/people.repository');
const MarketError = require('../utils/MarketError');

/**
 * Criar people
 * @param {Object} peopleBody
 * @returns {Promise<PeopleRepository>}
 */
const createPeople = async (peopleBody) => {
  if (await PeopleRepository.isEmailTaken(peopleBody.email)) {
    throw new MarketError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return PeopleRepository.createPeople(peopleBody);
};

module.exports = {
  createPeople,
};
