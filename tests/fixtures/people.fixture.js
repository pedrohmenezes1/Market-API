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
  cpf: faker.br.cpf(),
  data_nascimento: '13/01/2001',
  email: faker.internet.email().toLowerCase(),
  senha,
  habilitado: 'Sim',
};

const peopleTwo = {
  _id: mongoose.Types.ObjectId(),
  nome: faker.name.findName(),
  cpf: faker.br.cpf(),
  data_nascimento: '13/01/2001',
  email: faker.internet.email().toLowerCase(),
  senha,
  habilitado: 'Não',
};
const insertPeoples = async (peoples) => {
  await People.insertMany(peoples.map((people) => ({ ...people, password: hashedPassword })));
};

module.exports = {
  peopleOne,
  peopleTwo,
  insertPeoples,
};
