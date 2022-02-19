const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { rentalService } = require('../services');
const { serialize } = require('../serialize/people.serialize');

const createRental = catchAsync(async (req, res) => {
  const result = await rentalService.createRental(req.body);
  res.status(httpStatus.CREATED).send(serialize(result));
});

const getRental = catchAsync(async (req, res) => {
  const filter = pick(req.query, [
    'nome',
    'cnpj',
    'atividades',
    'endereco.cep',
    'endereco.logradouro',
    'endereco.complemento',
    'endereco.bairro',
    'endereco.number',
    'endereco.localidade',
    'endereco.uf',
  ]);
  const options = pick(req.query, ['limit', 'offset']);
  const result = await rentalService.rentalList(filter, options);
  res.status(200).send(result);
});

module.exports = {
  createRental,
  getRental,
};
