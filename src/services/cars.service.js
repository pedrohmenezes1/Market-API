/* const httpStatus = require('http-status'); */
const { Cars } = require('../models');
/* const MarketError = require('../utils/MarketError'); */

/**
 * Criar um carro
 * @param {Object} carsBody
 * @returns {Promise<Cars>}
 */
const createCars = async (carsBody) => {
  return Cars.create(carsBody);
};

module.exports = {
  createCars,
};
