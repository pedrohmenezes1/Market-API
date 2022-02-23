const httpStatus = require('http-status');
const { peopleRepository } = require('../repository');
const MarketError = require('../utils/MarketError');
const { underage } = require('../utils/underage');
/**
 * Cadastra pessoas
 * @param {Object} peopleBody
 * @returns {Promise<peopleRepository>}
 */
const createPeople = async (peopleBody) => {
  const birth = peopleBody.data_nascimento;
  const year = birth.substr(6, 4);
  if (underage(new Date(year)) === false) {
    throw new MarketError(httpStatus.UNAUTHORIZED, 'Pessoa menor de idade');
  }
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
  const birth = updateBody.data_nascimento;
  const year = birth.substr(6, 4);
  if (underage(new Date(year)) === false) {
    throw new MarketError(httpStatus.UNAUTHORIZED, 'Pessoa menor de idade');
  }
  if (updateBody.email && (await peopleRepository.isEmailTaken(updateBody.email, peopleId))) {
    throw new MarketError(httpStatus.BAD_REQUEST, 'Email já existe');
  }
  if (updateBody.cpf && (await peopleRepository.isCpfTaken(updateBody.cpf, peopleId))) {
    throw new MarketError(httpStatus.BAD_REQUEST, 'Cpf já existe');
  }
  Object.assign(peopleResult, updateBody);
  await peopleResult.save();
  return peopleResult;
};

/**
 * Buscar pessoa por id
 * @param {ObjectId} peopleId
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
