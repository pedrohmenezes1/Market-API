/* const httpStatus = require('http-status'); */
const CarsRepository = require('../repository/cars.repository');
/* const MarketError = require('../utils/MarketError'); */

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
 * @param {Object} cars
 * @returns {Promise<CarsRepository>}
 */
const carsList = async (cars) => {
  const carsResult = await CarsRepository.findCars(cars);
  return carsResult;
};

module.exports = {
  createCars,
  carsList,
};
