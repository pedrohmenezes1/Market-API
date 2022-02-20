const Joi = require('joi').extend(require('@joi/date'));
const { senha, objectId } = require('./custom.validation');

const createPeople = {
  body: Joi.object().keys({
    nome: Joi.string().required().min(5).trim(),
    cpf: Joi.string().required().min(11).max(14).trim(),
    data_nascimento: Joi.date().format('DD/MM/YYYY').raw().max('now').greater('1-1-1900').required(),
    email: Joi.string().required().email().trim(),
    senha: Joi.string().required().custom(senha).trim(),
    habilitado: Joi.string().required().lowercase().trim(),
  }),
};

const getPeoples = {
  query: Joi.object().keys({
    nome: Joi.string(),
    cpf: Joi.string(),
    data_nascimento: Joi.date().format('DD/MM/YYYY'),
    email: Joi.string(),
    habilitado: Joi.string(),
  }),
};

const getPeople = {
  params: Joi.object().keys({
    peopleId: Joi.required().custom(objectId),
  }),
};

const updatePeople = {
  body: Joi.object().keys({
    nome: Joi.string().optional().min(5).trim(),
    cpf: Joi.string().optional().trim(),
    data_nascimento: Joi.date().format('DD/MM/YYYY').raw().max('now').greater('1-1-1900').optional(),
    email: Joi.string().optional().email().trim(),
    senha: Joi.string().optional().custom(senha).trim(),
    habilitado: Joi.string().optional().lowercase().trim(),
  }),
};

const deletePeople = {
  params: Joi.object().keys({
    peopleId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createPeople,
  getPeoples,
  getPeople,
  updatePeople,
  deletePeople,
};
