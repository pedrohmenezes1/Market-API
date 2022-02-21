const mongoose = require('mongoose');
const { Rental } = require('../../src/models');

const rentalOne = {
  _id: mongoose.Types.ObjectId(),
  nome: 'Pedroliso Rent a Car',
  cnpj: '16.670.075/0001-55',
  atividades: 'Aluguel de Carros E Gestão de Frotas',
  endereco: [
    {
      cep: '54100-537',
      number: '1234',
      isFilial: false,
    },
    {
      cep: '96200-510',
      number: '5678',
      complemento: 'Muro A',
      isFilial: true,
    },
  ],
};

const rentalTwo = {
  _id: mongoose.Types.ObjectId(),
  nome: 'Pedroliso Locadora',
  cnpj: '16.680.075/0001-55',
  atividades: 'Gestão de Frotas',
  endereco: [
    {
      cep: '78148-775',
      number: '1234',
      isFilial: false,
    },
    {
      cep: '65058-351',
      number: '5678',
      complemento: 'Muro B',
      isFilial: true,
    },
  ],
};

const insertCars = async (cars) => {
  await Rental.insertMany(cars.map((car) => ({ ...car })));
};

module.exports = {
  rentalOne,
  rentalTwo,
  insertCars,
};
