const mongoose = require('mongoose');
const UF = require('../utils/enum.uf');
const { toJSON, paginate } = require('./plugins');

const rentalSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  cnpj: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate(value) {
      // eslint-disable-next-line no-useless-escape
      if (!value.match(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)) {
        throw new Error('CNPJ Inválido');
      }
    },
  },
  atividades: {
    type: String,
    required: true,
    trim: true,
  },
  endereco: [
    {
      cep: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      number: {
        type: String,
        required: true,
        trim: true,
      },
      complemento: {
        type: String,
        required: false,
        trim: true,
      },
      isFilial: {
        type: Boolean,
        required: true,
        trim: true,
      },
      logradouro: {
        type: String,
        required: false,
        trim: true,
      },
      bairro: {
        type: String,
        required: false,
        trim: true,
      },
      localidade: {
        type: String,
        required: false,
        trim: true,
      },
      uf: {
        type: String,
        enum: UF(),
        required: false,
        trim: true,
      },
      _id: false,
    },
  ],
});

rentalSchema.plugin(toJSON);
rentalSchema.plugin(paginate);

/**
 * @typedef Rental
 */

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
