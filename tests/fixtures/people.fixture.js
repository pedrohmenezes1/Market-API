const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');
const People = require('../../src/models/people.model');

const senha = 'senha1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(senha, salt);

const peopleOne = {
  _id: mongoose.Types.ObjectId(),
  nome: faker.name.findName(),
  cpf: '118.184.154-56',
  data_nascimento: '23/07/1998',
  email: faker.internet.email().toLowerCase(),
  senha,
  habilitado: 'Sim',
};

const peopleTwo = {
  _id: mongoose.Types.ObjectId(),
  nome: faker.name.findName(),
  cpf: '118.184.154-56',
  data_nascimento: '23/07/1998',
  email: faker.internet.email().toLowerCase(),
  senha,
  habilitado: 'Sim',
};
const insertPeoples = async (peoples) => {
  await People.insertMany(peoples.map((people) => ({ ...people, senha: hashedPassword })));
};

module.exports = {
  peopleOne,
  peopleTwo,
  insertPeoples,
};
