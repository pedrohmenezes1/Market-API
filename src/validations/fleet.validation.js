const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createFleet = {
  body: Joi.object().keys({
    nome: Joi.string().required().trim(),
    id_carro: Joi.array().custom(objectId).items(Joi.string().required()),
    status: Joi.string().required(),
    valor_diaria: Joi.number().required(),
    id_locadora: Joi.array().custom(objectId).items(Joi.string().required()),
    placa: Joi.string().required(),
  }),
};

const getFleets = {
  query: Joi.object().keys({
    nome: Joi.string(),
    id_carro: Joi.array().custom(objectId).items(Joi.string()),
    status: Joi.string(),
    valor_diaria: Joi.string(),
    id_locadora: Joi.array().custom(objectId).items(Joi.string()),
    placa: Joi.string(),
  }),
};

const getFleet = {
  params: Joi.object().keys({
    fleetId: Joi.required().custom(objectId),
    rentalId: Joi.required().custom(objectId),
  }),
};

const updateFleet = {
  body: Joi.object().keys({
    nome: Joi.string().optional().trim(),
    id_carro: Joi.array().custom(objectId).items(Joi.string().optional()),
    status: Joi.string().optional(),
    valor_diaria: Joi.number().optional(),
    id_locadora: Joi.array().custom(objectId).items(Joi.string().optional()),
    placa: Joi.string().optional(),
  }),
};

module.exports = {
  createFleet,
  getFleets,
  getFleet,
  updateFleet,
};
