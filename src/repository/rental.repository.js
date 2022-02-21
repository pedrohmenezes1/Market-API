const { Rental } = require('../models');

/**
 * Cadastrar uma locadora
 * @param {Object} rentalBody
 * @returns {Promise<Rental>}
 */
const createRental = async (rentalBody) => {
  return Rental.create(rentalBody);
};

/**
 * Verifica se o CNPJ já existe
 * @param {string} cnpj
 * @returns {Promise<boolean>}
 */
const isCnpjTaken = async (cnpj) => {
  const result = await Rental.findOne({ cnpj });
  return !!result;
};

const isMatriz = async (endereco) => {
  let count = 0;
  endereco.forEach((body) => {
    if (!body.isFilial) {
      // eslint-disable-next-line no-plusplus
      count++;
    }
    if (count > 1);
  });
};

/**
 * Consulta para locadora
 * @param {Object} filter - Filtro Mongo
 * @param {Object} options - Opções de consulta
 * @param {number} [options.limit] - Número máximo de resultados por página (padrão = 100)
 * @param {number} [options.offset] - Página atual (padrão = 1)
 * @returns {Promise<QueryResult>}
 */
const findRental = async (filter, options) => {
  const result = await Rental.paginate(filter, options);
  return result;
};

/**
 * Consulta por id de locadora
 * @param {ObjectId} id
 * @returns {Promise<Rental>}
 */
const getRentalId = async (id) => {
  return Rental.findById(id);
};
module.exports = {
  createRental,
  isCnpjTaken,
  isMatriz,
  findRental,
  getRentalId,
};
