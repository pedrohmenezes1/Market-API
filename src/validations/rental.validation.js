const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createRental = {
  body: Joi.object().keys({
    nome: Joi.string().trim().required(),
    cnpj: Joi.string().required(),
    atividades: Joi.string().trim().required(),
    endereco: Joi.array()
      .min(1)
      .items({
        cep: Joi.string().trim().required(),
        complemento: Joi.string().trim().optional(),
        number: Joi.number().required(),
        isFilial: Joi.boolean().required(),
      })
      .required(),
  }),
};

const getRental = {
  query: Joi.object().keys({
    nome: Joi.string(),
    cnpj: Joi.string(),
    atividades: Joi.string(),
    endereco: Joi.array().items(
      Joi.object({
        cep: Joi.string(),
        complemento: Joi.string(),
        number: Joi.string(),
        isFilial: Joi.string(),
      })
    ),
  }),
};

const getRentalById = {
  params: Joi.object().keys({
    rentalId: Joi.required().custom(objectId),
  }),
};
module.exports = {
  createRental,
  getRental,
  getRentalById,
};
