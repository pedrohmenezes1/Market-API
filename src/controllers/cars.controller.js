const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { serialize } = require('../serialize/cars.serialize');
const { carsService } = require('../services');
const MarketError = require('../utils/MarketError');

const createCars = catchAsync(async (req, res) => {
  const result = await carsService.createCars(req.body);
  res.status(httpStatus.CREATED).send(serialize(result));
});

const getCars = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['modelo', 'cor', 'ano', 'acessorios.descricao']);
  const options = pick(req.query, ['limit', 'offset']);
  const result = await carsService.peopleList(filter, options);
  res.status(200).send(result);
});

const deleteCars = catchAsync(async (req, res) => {
  await carsService.deleteCarsById(req.params.carsId);
  res.status(httpStatus.NO_CONTENT).send();
});

const updateCars = catchAsync(async (req, res) => {
  const result = await carsService.updateCarsById(req.params.carsId, req.body);
  res.status(200).send(serialize(result));
});

const getCarsId = catchAsync(async (req, res) => {
  const result = await carsService.getCarsById(req.params.carsId);
  if (!result) {
    throw new MarketError(httpStatus.NOT_FOUND, 'Carro não encontrado');
  }
  res.status(200).send(serialize(result));
});

const updateAccessory = catchAsync(async (req, res) => {
  const result = await carsService.accessoryUpdate(req.params.id, req.params.accessoryId, req.body);
  if (!result) {
    throw new MarketError(httpStatus.NOT_FOUND, 'Acessório não encontrado');
  }
  res.status(200).send(result);
});

module.exports = {
  createCars,
  getCars,
  deleteCars,
  updateCars,
  getCarsId,
  updateAccessory,
};
