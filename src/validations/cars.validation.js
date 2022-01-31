const Joi = require('joi');
/* const { objectId } = require('./custom.validation'); */
const currentYear = new Date().getFullYear();

const createCars = {
  body: Joi.object().keys({
    modelo: Joi.string().required().min(6),
    cor: Joi.string().required().min(4),
    ano: Joi.number().integer().min(1950).max(currentYear),
    acessorios: Joi.array()
      .required()
      .min(1)
      .items(
        Joi.object({
          descricao: Joi.string().trim().required(),
        })
      )
      .unique((a, b) => a.descricao === b.descricao)
      .required(),
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

module.exports = {
  createCars,
  getCars,
};
