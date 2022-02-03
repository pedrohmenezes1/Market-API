const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { peopleService } = require('../services');
const { serialize } = require('../serialize/people.serialize');

const createPeople = catchAsync(async (req, res) => {
  const people = await peopleService.createPeople(req.body);
  res.status(httpStatus.CREATED).send(serialize(people));
});
module.exports = {
  createPeople,
};
