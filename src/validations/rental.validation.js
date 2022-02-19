const Joi = require('joi');

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

module.expots = {
  createRental,
};
