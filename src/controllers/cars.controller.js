const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { serialize, paginateSerialize } = require('../serialize/cars.serialize');
const { carsService } = require('../services');
/* const MarketError = require('../utils/MarketError'); */

const createCars = catchAsync(async (req, res) => {
  const car = await carsService.createCars(req.body);
  res.status(httpStatus.CREATED).send(serialize(car));
});

const getCars = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['modelo', 'cor', 'ano', 'acessorios.descricao']);
  const result = await carsService.carsList(req.query, filter);
  res.status(200).json(paginateSerialize(result));
});

const deleteCars = catchAsync(async (req, res) => {
  await carsService.deleteCarsById(req.params.carsId);
  res.status(httpStatus.NO_CONTENT).send();
});
module.exports = {
  createCars,
  getCars,
  deleteCars,
};
