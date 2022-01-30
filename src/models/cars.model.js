const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const carsSchema = mongoose.Schema(
  {
    modelo: {
      type: String,
      required: true,
      trim: true,
    },
    cor: {
      type: String,
      required: true,
      trim: true,
    },
    ano: {
      type: String,
      required: true,
      trim: true,
    },
    quantidadePassageiros: {
      type: String,
      required: true,
      trim: true,
    },
    acessorios: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

carsSchema.plugin(toJSON);

/**
 * @typedef Cars
 */

const Cars = mongoose.model('Cars', carsSchema);

module.exports = Cars;
