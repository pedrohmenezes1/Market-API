const httpStatus = require('http-status');
const { peopleRepository } = require('../repository');
const MarketError = require('../utils/MarketError');

/**
 * Cadastra pessoa
 * @param {Object} peopleBody
 * @returns {Promise<peopleRepository>}
 */
const createPeople = async (peopleBody) => {
  if (await peopleRepository.isEmailTaken(peopleBody.email)) {
    throw new MarketError(httpStatus.BAD_REQUEST, 'Email já existe');
  }
  return peopleRepository.createPeople(peopleBody);
};

/**
 * Listar pessoas
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {number} [options.limit] - Número máximo de resultados por página (padrão = 100)
 * @param {number} [options.offset] - Página atual (padrão = 1)
 * @returns {Promise<QueryResult>}
 */
const peopleList = async (filter, options) => {
  const peopleResult = await peopleRepository.findPeople(filter, options);
  return peopleResult;
};

/**
 * Deletar pessoa por id
 * @param {ObjectId} peopleId
 * @returns {Promise<peopleRepository>}
 */
const deletePeopleById = async (peopleId) => {
  const peopleResult = await peopleRepository.getPeopleId(peopleId);
  if (!peopleResult) {
    throw new MarketError(httpStatus.NOT_FOUND, 'Usuário não encontrado');
  }
  await peopleResult.remove();
  return peopleResult;
};

/**
 * Atulizar pessoas por id
 * @param {ObjectId} peopleId
 * @param {Object} updateBody
 * @returns {Promise<peopleRepository>}
 */
const updatePeopleById = async (peopleId, updateBody) => {
  const peopleResult = await peopleRepository.getPeopleId(peopleId);
  if (!peopleResult) {
    throw new MarketError(httpStatus.NOT_FOUND, 'Usuário não encontrado');
  }
  Object.assign(peopleResult, updateBody);
  await peopleResult.save();
  return peopleResult;
};

/**
 * Burcar pessoa por id
 * @param {ObjectId} id
 * @returns {Promise<peopleRepository>}
 */
const getPeopleById = async (peopleId) => {
  return peopleRepository.getPeopleId(peopleId);
};

/**
 * Buscar pessoa por email
 * @param {string} email
 * @returns {Promise<peopleRepository>}
 */
const getPeopleByEmail = async (email) => {
  return peopleRepository.getPeopleByEmail(email);
};

module.exports = {
  createPeople,
  peopleList,
  deletePeopleById,
  updatePeopleById,
  getPeopleById,
  getPeopleByEmail,
};
