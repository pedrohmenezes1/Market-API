const httpStatus = require('http-status');
const carsRepository = require('../repository/cars.repository');
const MarketError = require('../utils/MarketError');

/**
 * Criar um carro
 * @param {Object} carsBody
 * @returns {Promise<carsRepository>}
 */
const createCars = async (carsBody) => {
  return carsRepository.createCars(carsBody);
};

/**
 * Listar carros
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<carsRepository>}
 */
const carsList = async (filter, options) => {
  const carsResult = await carsRepository.findCars(filter, options);
  return carsResult;
};

/**
 * Deletar carros por id
 * @param {ObjectId} carsId
 * @returns {Promise<carsRepository>}
 */
const deleteCarsById = async (carsId) => {
  const carsResult = await carsRepository.getCarsId(carsId);
  if (!carsResult) {
    throw new MarketError(httpStatus.NOT_FOUND, 'Carro não encontrado');
  }
  await carsResult.remove();
  return carsResult;
};

/**
 * Atulizar carros por id
 * @param {ObjectId} carsId
 * @param {Object} updateBody
 * @returns {Promise<carsRepository>}
 */
const updateCarsById = async (carsId, updateBody) => {
  const carsResult = await carsRepository.getCarsId(carsId);
  if (!carsResult) {
    throw new MarketError(httpStatus.NOT_FOUND, 'Carro não encontrado');
  }
  Object.assign(carsResult, updateBody);
  await carsResult.save();
  return carsResult;
};

/**
 * Burcar carro por id
 * @param {ObjectId} carsId
 * @returns {Promise<carsRepository>}
 */
const getCarsById = async (carsId) => {
  return carsRepository.getCarsId(carsId);
};

/**
 * Atualizar acessórios
 * @param {ObjectId} carsId
 * @param {ObjectId} accessoryId
 * @param {Object} updateBody
 * @returns {Promise<Cars>}
 */
const accessoryUpdate = async (carsId, accessoryId, updateBody) => {
  const carsResult = await carsRepository.updateAccessory(carsId, accessoryId, updateBody);
  return carsResult;
};

module.exports = {
  createCars,
  carsList,
  deleteCarsById,
  updateCarsById,
  getCarsById,
  accessoryUpdate,
};
