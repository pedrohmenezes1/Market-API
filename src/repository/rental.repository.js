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
  const rental = await this.findOne({ cnpj });
  return !!rental;
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
module.exports = {
  createRental,
  isCnpjTaken,
  isMatriz,
};
