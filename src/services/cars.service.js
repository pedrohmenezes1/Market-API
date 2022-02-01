const httpStatus = require('http-status');
const CarsRepository = require('../repository/cars.repository');
const MarketError = require('../utils/MarketError');

/**
 * Criar um carro
 * @param {Object} carsBody
 * @returns {Promise<CarsRepository>}
 */
const createCars = async (carsBody) => {
  return CarsRepository.createCars(carsBody);
};

/**
 * Listar carros
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<CarsRepository>}
 */
const carsList = async (filter, options) => {
  const carsResult = await CarsRepository.findCars(filter, options);
  return carsResult;
};

/**
 * Delete cars by id
 * @param {ObjectId} carsId
 * @returns {Promise<CarsRepository>}
 */
const deleteCarsById = async (carsId) => {
  const cars = await CarsRepository.findCarsById(carsId);
  if (!cars) {
    throw new MarketError(httpStatus.NOT_FOUND, 'Carro não encontrado');
  }
  await cars.remove();
  return cars;
};

module.exports = {
  createCars,
  carsList,
  deleteCarsById,
};
