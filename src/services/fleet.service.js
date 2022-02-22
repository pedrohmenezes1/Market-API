const httpStatus = require('http-status');
const { fleetRepository } = require('../repository');
const MarketError = require('../utils/MarketError');

/**
 * Cadastrar uma nova frota
 * @param {ObjectId} rentalId
 * @param {Object} fleetBody
 * @returns {Promise<fleetRepository>}
 */
const createFleet = async (rentalId, fleetBody) => {
  if (await fleetRepository.isPlateTaken(fleetRepository.placa)) {
    throw new MarketError(httpStatus.BAD_REQUEST, 'Placa já existente');
  }
  return fleetRepository.createFleet(rentalId, fleetBody);
};

/**
 * Listar frotas
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {number} [options.limit] - Número máximo de resultados por página (padrão = 100)
 * @param {number} [options.offset] - Página atual (padrão = 1)
 * @returns {Promise<QueryResult>}
 */
const fleetList = async (filter, options) => {
  const fleetResult = await fleetRepository.findFleet(filter, options);
  return fleetResult;
};

/**
 * Deletar frotas por id
 * @param {ObjectId} fleetId
 * @returns {Promise<fleetRepository>}
 */
const deleteFleetById = async (fleetId) => {
  const fleetResult = await fleetRepository.getFleetId(fleetId);
  if (!fleetResult) {
    throw new MarketError(httpStatus.NOT_FOUND, 'Frota de veículos não encontrada');
  }
  await fleetResult.remove();
  return fleetResult;
};

/**
 * Cadastrar uma nova frota
 * @param {ObjectId} fleetId
 * @param {Object} updateBody
 * @returns {Promise<fleetRepository>}
 */
const updateFleetById = async (fleetId, updateBody) => {
  const fleetResult = await fleetRepository.getFleetId(fleetId);
  if (!fleetResult) {
    throw new MarketError(httpStatus.NOT_FOUND, 'Frota de veículos não encontrado');
  }
  if (await fleetRepository.isPlateTaken(fleetRepository.placa)) {
    throw new MarketError(httpStatus.BAD_REQUEST, 'Placa já existente');
  }
  Object.assign(fleetResult, updateBody);
  await fleetResult.save();
  return fleetResult;
};

module.exports = {
  createFleet,
  fleetList,
  deleteFleetById,
  updateFleetById,
};
