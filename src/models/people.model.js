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

/**
 * Verifica o email
 * @param {string} email - Email de pessoas
 * @param {ObjectId} [excludePeopleId] - O id de pessoa a ser excluído
 * @returns {Promise<boolean>}
 */
peopleSchema.statics.isEmailTaken = async function (email, excludePeopleId) {
  const people = await this.findOne({ email, _id: { $ne: excludePeopleId } });
  return !!people;
};

/**
 * Verifica se as senhas batem
 * @param {string} senha
 * @returns {Promise<boolean>}
 */
peopleSchema.methods.isPasswordMatch = async function (senha) {
  const people = this;
  return bcrypt.compare(senha, people.senha);
};

peopleSchema.pre('save', async function (next) {
  const people = this;
  if (people.isModified('senha')) {
    people.senha = await bcrypt.hash(people.senha, 8);
  }
  next();
});

/**
 * @typedef People
 */

const People = mongoose.model('People', peopleSchema);

module.exports = People;
