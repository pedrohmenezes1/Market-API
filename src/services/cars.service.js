/* const httpStatus = require('http-status'); */
const CarsRepository = require('../repository/cars.repository');
/* const MarketError = require('../utils/MarketError'); */

/**
 * Criar um carro
 * @param {Object} carsBody
 * @returns {Promise<CarsRepository>}
 */
const createCars = async (carsBody) => {
  return CarsRepository.create(carsBody);
};

module.exports = {
  createCars,
};
