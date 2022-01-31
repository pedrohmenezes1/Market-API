const httpStatus = require('http-status');
/* const pick = require('../utils/pick'); */
const catchAsync = require('../utils/catchAsync');
const { serialize, paginateSerialize } = require('../serialize/cars.serialize');
const { carsService } = require('../services');
/* const MarketError = require('../utils/MarketError'); */

const createCars = catchAsync(async (req, res) => {
  const car = await carsService.createCars(req.body);
  res.status(httpStatus.CREATED).send(serialize(car));
});

const getCars = catchAsync(async (req, res) => {
  const veiculos = await carsService.carsList(req.query);
  res.status(200).json(paginateSerialize(veiculos));
});

module.exports = {
  createCars,
  getCars,
};
