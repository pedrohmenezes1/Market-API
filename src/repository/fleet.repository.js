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
 * @param {Object} [excludeFleetId] - O id da frota a ser excluída
 * @returns {Promise<boolean>}
 */
const isPlateTaken = async (placa, excludeFleetId) => {
  const result = await Fleet.find({ placa, _id: { $ne: excludeFleetId } });
  return !!result;
};

/**
 * Consulta para frotas
 * @param {Object} filter - Filtro Mongo
 * @param {Object} options - Opções de consulta
 * @param {number} [options.limit] - Número máximo de resultados por página (padrão = 100)
 * @param {number} [options.offset] - Página atual (padrão = 1)
 * @returns {Promise<QueryResult>}
 */
const findFleet = async (filter, options) => {
  const people = await Fleet.paginate(filter, options);
  return people;
};

/**
 * Consulta por id de frotas
 * @param {ObjectId} id
 * @param {ObjectId} getRentalId
 * @returns {Promise<Fleet>}
 */
const getFleetId = async (fleetId, rentalId) => {
  return Fleet.find({ id: fleetId, id_locadora: rentalId });
};

/**
 * Atualiza uma frota
 * @param {ObjectId} fleetId
 * @param {Object} updateBody
 * @returns {Promise<Fleet>}
 */
const updateOneFleet = async (fleetId) => {
  return this.getFleetId(fleetId);
};

module.exports = {
  createFleet,
  isPlateTaken,
  findFleet,
  getFleetId,
  updateOneFleet,
};
