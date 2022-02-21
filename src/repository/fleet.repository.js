const { Fleet } = require('../models');

/**
 * Cadastrar uma nova frota
 * @param {ObjectId} rentalId
 * @param {Object} fleetBody
 * @returns {Promise<Fleet>}
 */
const createFleet = async (fleetBody) => {
  return Fleet.create(fleetBody);
};

/**
 * Verifica se a placa já existe
 * @param {string} placa - Placa do veículo
 * @param {ObjectId} [excludeFleetId] - O id da frota a ser excluída
 * @returns {Promise<boolean>}
 */
const isPlateTaken = async (fleetBody) => {
  const result = await Fleet.find({ placa: fleetBody.placa });
  return !!result;
};

module.exports = {
  createFleet,
  isPlateTaken,
};
