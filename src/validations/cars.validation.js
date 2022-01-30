const Joi = require('joi');
/* const { objectId } = require('./custom.validation'); */

const createCars = {
  body: Joi.object().keys({
    modelo: Joi.string().required().min(6),
    cor: Joi.string().required().min(4),
    ano: Joi.number().integer().min(1950).max(2022),
    acessorios: Joi.array()
      .required()
      .min(1)
      .items({
        descricao: Joi.string(),
      })
      .unique('Ar-condicionado')
      .unique('Dir. Hidráulica')
      .unique('Cabine Dupla')
      .unique('Tração 4x4')
      .unique('4 portas')
      .unique('Diesel')
      .unique('Air bag')
      .unique('ABS'),
    quantidadePassageiros: Joi.number().required().min(2),
  }),
};

module.exports = {
  createCars,
};
