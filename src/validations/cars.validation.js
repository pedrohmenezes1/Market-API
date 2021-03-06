const Joi = require('joi');
const { objectId } = require('./custom.validation');

const currentYear = new Date().getFullYear();

const createCars = {
  body: Joi.object().keys({
    modelo: Joi.string().required().trim(),
    cor: Joi.string().required().min(4).trim(),
    ano: Joi.number().integer().min(1950).max(currentYear).required(),
    acessorios: Joi.array()
      .required()
      .min(1)
      .items(
        Joi.object({
          descricao: Joi.string(),
        })
      )
      .unique((a, b) => a.descricao === b.descricao),
    quantidadePassageiros: Joi.number().required().min(1).positive(),
  }),
};

const getCars = {
  query: Joi.object().keys({
    modelo: Joi.string(),
    cor: Joi.string(),
    ano: Joi.number().integer(),
    acessorios: Joi.array().items(
      Joi.object({
        descricao: Joi.string(),
      })
    ),
  }),
};

const deleteCars = {
  params: Joi.object().keys({
    carsId: Joi.required().custom(objectId),
  }),
};

const updateCars = {
  params: Joi.object().keys({
    carsId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    modelo: Joi.string().optional().trim(),
    cor: Joi.string().optional().min(4).trim(),
    ano: Joi.number().integer().min(1950).max(currentYear).optional(),
    acessorios: Joi.array()
      .optional()
      .min(1)
      .items(
        Joi.object({
          descricao: Joi.string(),
        })
      )
      .unique((a, b) => a.descricao === b.descricao),
    quantidadePassageiros: Joi.number().required().min(1).positive(),
  }),
};

const updateAccessory = {
  params: Joi.object().keys({
    carsId: Joi.required().custom(objectId),
    accessoryId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    modelo: Joi.string().optional().min(6).trim(),
    cor: Joi.string().optional().min(4).trim(),
    ano: Joi.number().integer().min(1950).max(currentYear).optional(),
    acessorios: Joi.array()
      .required()
      .min(1)
      .items(
        Joi.object({
          descricao: Joi.string(),
        })
      )
      .unique((a, b) => a.descricao === b.descricao),
    quantidadePassageiros: Joi.number().optional().min(1).positive(),
  }),
};
module.exports = {
  createCars,
  getCars,
  deleteCars,
  updateCars,
  updateAccessory,
};
