const httpStatus = require('http-status');
const { fleetService } = require('../services');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { serialize } = require('../serialize/fleet.serialize');

const createFleet = catchAsync(async (req, res) => {
  const result = await fleetService.createFleet(req.params.rentalId, req.body);
  res.status(httpStatus.CREATED).send(serialize(result));
});

const getFleet = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['nome', 'cpf', 'data_nascimento', 'email', 'habilitado']);
  const options = pick(req.query, ['limit', 'offset']);
  const result = await fleetService.fleetList(req.params.rentalId, filter, options);
  res.status(200).send(result);
});

module.exports = {
  createFleet,
  getFleet,
};
