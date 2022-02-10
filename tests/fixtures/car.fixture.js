const mongoose = require('mongoose');
const Cars = require('../../src/models/cars.model');

const carOne = {
  _id: mongoose.Types.ObjectId(),
  modelo: 'GM S10 2.8',
  ano: '2018',
  acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Dir. Hidráulica' }],
};

const insertCars = async (car) => {
  await Cars.insertMany(car.map((cars) => ({ ...cars })));
};

module.exports = {
  carOne,
  insertCars,
};
