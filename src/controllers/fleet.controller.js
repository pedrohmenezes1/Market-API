const httpStatus = require('http-status');
const { fleetService } = require('../services');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const MarketError = require('../utils/MarketError');
const { serialize } = require('../serialize/fleet.serialize');

const createFleet = catchAsync(async (req, res) => {
  const result = await fleetService.createFleet(req.params.rentalId, req.body);
  res.status(httpStatus.CREATED).send(serialize(result));
});

const getFleet = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['nome', 'id_carro', 'status', 'valor_diaria', 'id_locadora', 'placa']);
  const options = pick(req.query, ['limit', 'offset']);
  const result = await fleetService.fleetList(req.params.rentalId, filter, options);
  res.status(200).send(result);
});

const deleteFleet = catchAsync(async (req, res) => {
  await fleetService.deleteFleetById(req.params.rentalId, req.params.fleetId);
  res.status(httpStatus.NO_CONTENT).send();
});

const updateFleet = catchAsync(async (req, res) => {
  const result = await fleetService.updateFleetById(req.params.rantalId, req.params.fleetId, req.body);
  res.status(200).send(serialize(result));
});

const getFleetId = catchAsync(async (req, res) => {
  const result = await fleetService.getFleetById(req.params.rentalId, req.params.fleetId);
  if (!result) {
    throw new MarketError(httpStatus.NOT_FOUND, 'Frota não encontrada');
  }
  res.status(200).send(serialize(result));
});

module.exports = {
  createFleet,
  getFleet,
  deleteFleet,
  updateFleet,
  getFleetId,
};
