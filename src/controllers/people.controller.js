const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const MarketError = require('../utils/MarketError');
const { peopleService } = require('../services');
const { serialize } = require('../serialize/people.serialize');

const createPeople = catchAsync(async (req, res) => {
  const people = await peopleService.createPeople(req.body);
  res.status(httpStatus.CREATED).send(serialize(people));
});

const getPeople = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['nome', 'cpf', 'data_nascimento', 'email', 'habilitado']);
  const options = pick(req.query, ['limit', 'offset']);
  const result = await peopleService.peopleList(filter, options);
  res.status(200).send(result);
});

const deletePeople = catchAsync(async (req, res) => {
  await peopleService.deletePeopleById(req.params.peopleId);
  res.status(httpStatus.NO_CONTENT).send();
});

const updatePeople = catchAsync(async (req, res) => {
  const people = await peopleService.updatePeopleById(req.params.peopleId, req.body);
  res.status(200).send(serialize(people));
});

const getPeopleId = catchAsync(async (req, res) => {
  const people = await peopleService.getPeopleById(req.params.peopleId);
  if (!people) {
    throw new MarketError(httpStatus.NOT_FOUND, 'Pessoa não encontrada');
  }
  res.status(200).send(serialize(people));
});

module.exports = {
  createPeople,
  getPeople,
  getPeopleId,
  deletePeople,
  updatePeople,
};
