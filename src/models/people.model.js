const mongoose = require('mongoose');
const validator = require('validator');
const autoIncrement = require('mongoose-auto-increment');
const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate-v2');
const { toJSON } = require('./plugins');

const connection = mongoose.createConnection('mongodb://localhost:27017/market-api');

autoIncrement.initialize(connection);

const peopleSchema = mongoose.Schema(
  {
    _id: {
      type: Number,
      default: 0,
      unique: true,
      required: true,
    },
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
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('A senha deve conter pelo menos uma letra e um número');
        }
      },
      private: true, // used by the toJSON plugin
    },
    habilitado: {
      type: String,
      required: true,
      enum: ['Sim', 'Não'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

peopleSchema.plugin(toJSON);

peopleSchema.plugin(mongoosePaginate);

peopleSchema.plugin(autoIncrement.plugin, {
  model: 'People',
  field: '_id',
  startAt: 1,
  incrementBy: 1,
});

/**
 * Verifica se o e-mail foi recebido
 * @param {string} email - The people's email
 * @param {ObjectId} [excludePeopleId] - The id of the people to be excluded
 * @returns {Promise<boolean>}
 */
peopleSchema.statics.isEmailTaken = async function (email, excludePeopleId) {
  const people = await this.findOne({ email, _id: { $ne: excludePeopleId } });
  return !!people;
};

/**
 * Verifique se a senha corresponde a senha de pessoas
 * @param {string} password
 * @returns {Promise<boolean>}
 */
peopleSchema.methods.isPasswordMatch = async function (password) {
  const people = this;
  return bcrypt.compare(password, people.senha);
};

peopleSchema.pre('save', async function (next) {
  const people = this;
  if (people.isModified('password')) {
    people.senha = await bcrypt.hash(people.senha, 10);
  }
  next();
});

/**
 * @typedef People
 */

const People = mongoose.model('People', peopleSchema);

module.exports = People;
