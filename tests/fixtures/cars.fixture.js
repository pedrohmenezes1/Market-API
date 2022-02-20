const mongoose = require('mongoose');
const { Cars } = require('../../src/models');

const carOne = {
  _id: mongoose.Types.ObjectId(),
  modelo: 'Honda Civic',
  cor: 'Preto',
  ano: 2018,
  acessorios: [
    { descricao: 'Ar-condicionado' },
    { descricao: 'Dir. Hidráulica' },
    { descricao: 'Trava elétrica' },
    { descricao: 'Vidro elétrico' },
  ],
  quantidadePassageiros: 4,
};

const carTwo = {
  _id: mongoose.Types.ObjectId(),
  modelo: 'Fusca',
  cor: 'Branco',
  ano: 2010,
  acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Vidro elétrico' }],
  quantidadePassageiros: 2,
};

const insertCars = async (cars) => {
  await Cars.insertMany(cars.map((car) => ({ ...car })));
};

module.exports = {
  carOne,
  carTwo,
  insertCars,
};
