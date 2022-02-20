const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker-br');
const People = require('../../src/models/people.model');

const senha = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(senha, salt);

const peopleOne = {
  _id: mongoose.Types.ObjectId(),
  nome: faker.name.findName(),
  cpf: '194.164.151-95',
  data_nascimento: '24/06/1997',
  email: 'pedro.mk.21@hotmail.com',
  senha,
  habilitado: 'sim',
};

const peopleTwo = {
  _id: mongoose.Types.ObjectId(),
  nome: faker.name.findName(),
  cpf: '194.164.157-95',
  data_nascimento: '20/01/1998',
  email: faker.internet.email(),
  senha,
  habilitado: 'não',
};
const peopleThree = {
  _id: mongoose.Types.ObjectId(),
  nome: faker.name.findName(),
  cpf: '194.164.157-85',
  data_nascimento: '20/01/1999',
  email: faker.internet.email(),
  senha,
  habilitado: 'não',
};
const insertPeoples = async (peoples) => {
  await People.insertMany(peoples.map((people) => ({ ...people, password: hashedPassword })));
};

module.exports = {
  peopleOne,
  peopleTwo,
  peopleThree,
  insertPeoples,
};
