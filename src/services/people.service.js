const httpStatus = require('http-status');
const moment = require('moment');
const { peopleRepository } = require('../repository');
const MarketError = require('../utils/MarketError');
const underage = require('../utils/underage');
/**
 * Cadastra pessoas
 * @param {Object} peopleBody
 * @returns {Promise<peopleRepository>}
 */
const createPeople = async (peopleBody) => {
  // eslint-disable-next-line no-param-reassign
  peopleBody.data_nascimento = moment(peopleBody.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
  underage(peopleBody);
  if (await peopleRepository.isEmailTaken(peopleBody.email)) {
    throw new MarketError(httpStatus.BAD_REQUEST, 'Email já existe');
  }
  if (await peopleRepository.isCpfTaken(peopleBody.cpf)) {
    throw new MarketError(httpStatus.BAD_REQUEST, 'Cpf já existe');
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
 * Deletar pessoas por id
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
 * Atualizar pessoas por id
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
 * Buscar pessoa por id
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
