const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const peopleSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    cpf: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        // eslint-disable-next-line no-useless-escape
        if (!value.match(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)) {
          throw new Error('CPF Inválido');
        }
      },
    },
    data_nascimento: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    senha: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('A senha deve conter pelo menos uma letra e um número');
        }
      },
      private: true,
    },
    habilitado: {
      type: String,
      required: true,
      enum: ['Sim', 'Não'],
    },
  },
  {
    timestamps: true,
  }
);

peopleSchema.plugin(paginate);
peopleSchema.plugin(toJSON);

peopleSchema.pre('save', async function encrypted(next) {
  const hash = await bcrypt.hash(this.senha, 8);
  this.senha = hash;

  next();
});

/**
 * @typedef People
 */

const People = mongoose.model('People', peopleSchema);

module.exports = People;
