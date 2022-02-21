const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const fleetSchema = mongoose.Schema(
  {
    id_carro: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cars',
      required: true,
    },
    id_locadora: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rental',
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    valor_diaria: {
      type: Number,
      required: true,
    },
    placa: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

fleetSchema.plugin(paginate);
fleetSchema.plugin(toJSON);

/**
 * @typedef Fleet
 */

const Fleet = mongoose.model('Fleet', fleetSchema, 'Fleet');

module.exports = Fleet;
