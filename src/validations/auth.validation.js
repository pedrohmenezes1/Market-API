const JoiImport = require('joi');
const DateExtension = require('@joi/date');
const { senha } = require('./custom.validation');

const Joi = JoiImport.extend(DateExtension);

const authenticate = {
  body: Joi.object().keys({
    email: Joi.string().required().email().lowecase(),
    senha: Joi.string().required().custom(senha),
  }),
};

module.exports = {
  authenticate,
};
