const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { serialize } = require('../serialize/cars.serialize');
const { carsService } = require('../services');
/* const pick = require('../utils/pick'); */
/* const MarketError = require('../utils/MarketError'); */

const createCars = catchAsync(async (req, res) => {
  const car = await carsService.createCars(req.body);
  res.status(httpStatus.CREATED).send(serialize(car));
});

module.exports = {
  createCars,
};
