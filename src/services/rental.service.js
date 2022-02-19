const httpStatus = require('http-status');
const { rentalRepository } = require('../repository');
const MarketError = require('../utils/MarketError');
const viaCep = require('../utils/external.API');

/**
 * Cadastra uma locadora
 * @param {Object} rentalBody
 * @param {Object} data
 * @returns {Promise<rentalRepository>}
 */
const createRental = async (rentalBody, data) => {
  if (await rentalRepository.isCnpjTaken(rentalBody.cnpj)) {
    throw new MarketError(httpStatus.BAD_REQUEST, 'Cnpj já existe');
  }
  if (await rentalRepository.isMatriz(rentalBody.endereco)) {
    throw new MarketError(httpStatus.CONFLICT, 'Apenas uma matriz existente');
  }

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < rentalBody.endereco.length; i++) {
    const ceps = rentalBody.endereco;
    const rentalResult = ceps[i];
    // eslint-disable-next-line no-await-in-loop
    const buscar = await viaCep.viaCep(rentalResult.cep);
    const { cep, logradouro, complemento, bairro, localidade, uf } = buscar;
    rentalResult.cep = cep;
    rentalResult.logradouro = logradouro;
    rentalResult.complemento = complemento;
    rentalResult.bairro = bairro;
    rentalResult.localidade = localidade;
    rentalResult.uf = uf;
  }
  const rentalResult = await rentalRepository.createRental(rentalBody, data);
  return rentalResult;
};

/**
 * Listar locadoras
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {number} [options.limit] - Número máximo de resultados por página (padrão = 100)
 * @param {number} [options.offset] - Página atual (padrão = 1)
 * @returns {Promise<QueryResult>}
 */
const rentalList = async (filter, options) => {
  const rentalResult = await rentalRepository.findRental(filter, options);
  return rentalResult;
};

/**
 * Buscar locadora por id
 * @param {ObjectId} id
 * @returns {Promise<rentalRepository>}
 */
const getRentalById = async (rentalId) => {
  return rentalRepository.getRentalId(rentalId);
};

/**
 * Atualizar pessoas por id
 * @param {ObjectId} rentalId
 * @param {Object} updateBody
 * @returns {Promise<rentalRepository>}
 */
const updateRentalById = async (rentalId, updateBody) => {
  const rentalResult = await rentalRepository.getRentalId(rentalId);
  if (!rentalResult) {
    throw new MarketError(httpStatus.NOT_FOUND, 'Locadora não encontrada');
  }
  Object.assign(rentalResult, updateBody);
  await rentalResult.save();
  return rentalResult;
};

/**
 * Deletar locadora por id
 * @param {ObjectId} rentalId
 * @returns {Promise<rentalRepository>}
 */
const deleteRentalById = async (rentalId) => {
  const rentalResult = await rentalRepository.getRentalId(rentalId);
  if (!rentalResult) {
    throw new MarketError(httpStatus.NOT_FOUND, 'Locadora não encontrada');
  }
  await rentalResult.remove();
  return rentalResult;
};
module.exports = {
  createRental,
  rentalList,
  getRentalById,
  updateRentalById,
  deleteRentalById,
};
