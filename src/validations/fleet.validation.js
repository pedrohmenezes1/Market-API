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

module.exports = {
  createFleet,
};
