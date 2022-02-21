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

module.exports = {
  createFleet,
};
