const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const reserveSchema = mongoose.Schema(
  {
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'People',
    },
    data_inicio: {
      type: Date,
      required: true,
    },
    data_fim: {
      type: Date,
      required: true,
    },
    id_carro: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cars',
      required: true,
    },
    id_locadora: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Locadora',
      required: true,
    },
    valor_final: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

reserveSchema.plugin(paginate);
reserveSchema.plugin(toJSON);

/**
 * @typedef Reserve
 */

const Reserve = mongoose.model('Reserve', reserveSchema, 'Reserve');

module.exports = Reserve;
