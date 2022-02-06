const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
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
    versionKey: false,
    timestamps: true,
  }
);

carsSchema.plugin(toJSON);

carsSchema.plugin(mongoosePaginate);

/**
 * @typedef Cars
 */

const Cars = mongoose.model('Cars', carsSchema);

module.exports = Cars;
