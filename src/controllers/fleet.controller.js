const httpStatus = require('http-status');
const { fleetService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const { serialize } = require('../serialize/fleet.serialize');

const createFleet = catchAsync(async (req, res) => {
  const result = await fleetService.createFleet(req.params.rentalId, req.body);
  res.status(httpStatus.CREATED).send(serialize(result));
});

module.exports = {
  createFleet,
};
