const httpStatus = require('http-status');
const { rentalRepository } = require('../repository');
const MarketError = require('../utils/MarketError');
const viaCep = require('../utils/external.API');

/**
 * Cadastra uma locadora
 * @param {Object} prentalBody
 * @returns {Promise<enderecos>}
 */
const createRental = async (rentalBody, data) => {
  if (await rentalRepository.isCnpjTaken(rentalBody.cnpj)) {
    throw new MarketError(httpStatus.BAD_REQUEST, 'Cnpj já existe');
  }
  if (await rentalRepository.isMatriz(rentalBody.endereco)) {
    throw new MarketError(httpStatus.CONFLICT, 'Apenas uma matriz existente');
  }

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < rentalBody.endereco.length; i++) {
    const ceps = rentalBody.endereco;
    const rentalResult = ceps[i];
    // eslint-disable-next-line no-await-in-loop
    const buscar = await viaCep.viaCep(rentalResult.cep);
    const { cep, logradouro, complemento, bairro, localidade, uf } = buscar;
    rentalResult.cep = cep;
    rentalResult.logradouro = logradouro;
    rentalResult.complemento = complemento;
    rentalResult.bairro = bairro;
    rentalResult.localidade = localidade;
    rentalResult.uf = uf;
  }
  const rentalResult = await rentalRepository.createRental(rentalBody, data);
  return rentalResult;
};

module.exports = {
  createRental,
};
