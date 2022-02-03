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

/**
 * Listar pessoas
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<PeopleRepository>}
 */
const peopleList = async (filter, options) => {
  const peopleResult = await PeopleRepository.findPeople(filter, options);
  return peopleResult;
};

/**
 * Deletar pessoa por id
 * @param {ObjectId} peopleId
 * @returns {Promise<PeopleRepository>}
 */
const deletePeopleById = async (peopleId) => {
  const people = await PeopleRepository.findPeopleById(peopleId);
  if (!people) {
    throw new MarketError(httpStatus.NOT_FOUND, 'Usuário não encontrado');
  }
  await people.remove();
  return people;
};

/**
 * Atulizar pessoas por id
 * @param {ObjectId} peopleId
 * @param {Object} updateBody
 * @returns {Promise<PeopleRepository>}
 */
const updatePeopleById = async (peopleId, updateBody) => {
  const people = await PeopleRepository.getpeopleId(peopleId);
  if (!people) {
    throw new MarketError(httpStatus.NOT_FOUND, 'Usuário não encontrado');
  }
  Object.assign(people, updateBody);
  await people.save();
  return people;
};

/**
 * Burcar pessoa por id
 * @param {ObjectId} id
 * @returns {Promise<PeopleRepository>}
 */
const getPeopleById = async (id) => {
  return PeopleRepository.getPeopleId(id);
};

module.exports = {
  createPeople,
  peopleList,
  deletePeopleById,
  updatePeopleById,
  getPeopleById,
};
