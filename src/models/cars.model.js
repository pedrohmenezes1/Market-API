const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const { toJSON } = require('./plugins');

const connection = mongoose.createConnection('mongodb://localhost:27017/market-api');

autoIncrement.initialize(connection);

const carsSchema = mongoose.Schema(
  {
    _id: {
      type: Number,
      default: 0,
      unique: true,
      required: true,
    },
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

carsSchema.plugin(autoIncrement.plugin, {
  model: 'Cars',
  field: '_id',
  startAt: 1,
  incrementBy: 1,
});

/**
 * @typedef Cars
 */

const Cars = mongoose.model('Cars', carsSchema);

module.exports = Cars;
