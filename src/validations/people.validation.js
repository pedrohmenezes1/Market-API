const JoiImport = require('joi');
const DateExtension = require('@joi/date');
const { password, objectId } = require('./custom.validation');

const Joi = JoiImport.extend(DateExtension);
const now = Date.now();
const cutoffDate = new Date(now - 1000 * 60 * 60 * 24 * 365 * 18);

const createPeople = {
  body: Joi.object().keys({
    nome: Joi.string().required().min(5),
    cpf: Joi.string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
      .required(),
    data_nascimento: Joi.date().format('DD/MM/YYYY').raw().max('now').greater('1-1-1900').min(cutoffDate),
    email: Joi.string().required().email(),
    senha: Joi.string().required().custom(password),
    habilitado: Joi.string().required().valid('Sim', 'Não'),
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
    peopleId: Joi.string().custom(objectId),
  }),
};

const updatePeople = {
  body: Joi.object().keys({
    nome: Joi.string().required().min(5),
    cpf: Joi.string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
      .required(),
    data_nascimento: Joi.date().format('DD/MM/YYYY').raw().max('now').greater('1-1-1900').min(cutoffDate),
    email: Joi.string().required().email(),
    senha: Joi.string().required().custom(password),
    habilitado: Joi.string().required().valid('Sim', 'Não'),
  }),
};

const deletePeople = {
  params: Joi.object().keys({
    peopleId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPeople,
  getPeoples,
  getPeople,
  updatePeople,
  deletePeople,
};
