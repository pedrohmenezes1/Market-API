const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const { colors } = require('../utils/enum');

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
      enum: {
        values: colors(),
        message: 'Não é uma cor válida',
      },
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
