const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

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
      type: Number,
      required: true,
      trim: true,
    },
    quantidadePassageiros: {
      type: Number,
      required: true,
      trim: true,
    },
    acessorios: [
      {
        descricao: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

carsSchema.plugin(toJSON);
carsSchema.plugin(paginate);

/**
 * @typedef Cars
 */

const Cars = mongoose.model('Cars', carsSchema);

module.exports = Cars;
