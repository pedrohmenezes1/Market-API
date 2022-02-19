const JoiImport = require('joi');
const DateExtension = require('@joi/date');
const { senha, objectId } = require('./custom.validation');

const Joi = JoiImport.extend(DateExtension);
const now = Date.now();
const cutoffDate = new Date(now - 1000 * 60 * 60 * 24 * 365 * 18);

const createPeople = {
  body: Joi.object().keys({
    nome: Joi.string().required().min(5).trim(),
    cpf: Joi.string().required().min(11).max(14).trim(),
    data_nascimento: Joi.date().format('DD/MM/YYYY').raw().max('now').max(cutoffDate).trim().required(),
    email: Joi.string().required().email().trim(),
    senha: Joi.string().required().custom(senha).trim(),
    habilitado: Joi.string().required().lowercase().trim(),
  }),
};

const getPeoples = {
  query: Joi.object().keys({
    nome: Joi.string(),
    cpf: Joi.string(),
    data_nascimento: Joi.date(),
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
    nome: Joi.string().required().min(5).trim(),
    cpf: Joi.string().required().trim(),
    data_nascimento: Joi.date().format('DD/MM/YYYY').raw().max('now').max(cutoffDate).trim().required(),
    email: Joi.string().required().email().trim(),
    senha: Joi.string().required().custom(senha).trim(),
    habilitado: Joi.string().required().lowercase().trim(),
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
