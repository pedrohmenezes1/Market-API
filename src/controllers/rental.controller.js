const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { rentalService } = require('../services');
const { serialize } = require('../serialize/people.serialize');

const createRental = catchAsync(async (req, res) => {
  const result = await rentalService.createRental(req.body);
  res.status(httpStatus.CREATED).send(serialize(result));
});

module.exports = {
  createRental,
};
