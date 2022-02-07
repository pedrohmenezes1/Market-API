const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const mongoosePaginate = require('mongoose-paginate-v2');
const { toJSON } = require('./plugins');

const peopleSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    cpf: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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

peopleSchema.plugin(mongoosePaginate);
peopleSchema.plugin(toJSON);

peopleSchema.pre('save', async function encrypted(next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;

  next();
});

/**
 * @typedef People
 */

const People = mongoose.model('People', peopleSchema);

module.exports = People;
