/* eslint-disable class-methods-use-this */
const { Cars } = require('../models');

/**
 * Cadastrar um carro
 * @param {Object} carBody
 * @returns {Promise<CarsRepository>}
 */
const createCars = async (carBody) => {
  return Cars.create(carBody);
};

/**
 * Consulta de carros
 * @param {Object} filter - Filtro Mongo
 * @param {Object} options - Opções de consulta
 * @param {number} [options.limit] - Número máximo de resultados por página (padrão = 100)
 * @param {number} [options.page] - Página atual (padrão = 1)
 * @returns {Promise<QueryResult>}
 */
const findCars = async (filter, options) => {
  const cars = await Cars.paginate(filter, options);
  return cars;
};

/**
 * Consultar carro por Id
 * @param {ObjectId} id
 * @returns {Promise<Cars>}
 */
const getCarsId = async (id) => {
  return Cars.findById(id);
};

/**
 * Atualizar acessórios
 * @param {ObjectId} carsId
 * @param {ObjectId} acessoryId
 * @param {Object} updateBody
 * @returns {Promise<Cars>}
 */
const updateAccessory = async (id, accessoryId, updateBody) => {
  return Cars.findByIdAndUpdate(
    id,
    { $set: { 'acessorios.$[outer].descricao': updateBody.descricao } },
    { arrayFilters: [{ 'outer.id': accessoryId }] },
    { upsert: true, returnNewDocument: true }
  );
};

module.exports = {
  createCars,
  findCars,
  getCarsId,
  updateAccessory,
};
