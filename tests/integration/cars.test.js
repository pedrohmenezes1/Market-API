const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { Cars } = require('../../src/models');
const { carOne, insertCars } = require('../fixtures/cars.fixture');

setupTestDB();

describe('Rotas de veículos', () => {
  describe('POST /api/v1/car', () => {
    let newCar;

    beforeEach(() => {
      newCar = {
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
    });

    test('deve retornar 201 e cadastrar com sucesso um novo veículo se os dados estiverem corretos', async () => {
      await insertCars([carOne]);

      const res = await request(app).post('/api/v1/people').send(newCar).expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        id: expect.anything(),
        modelo: newCar.modelo,
        cor: newCar.cor,
        ano: newCar.ano,
        acessorios: newCar.acessorios.descricao,
        quantidadePassageiros: newCar.quantidadePassageiros,
      });

      const dbCars = await Cars.findById(res.body.id);
      expect(dbCars).toBeDefined();
      expect(dbCars).toMatchObject({
        modelo: newCar.modelo,
        cor: newCar.cor,
        ano: newCar.ano,
        acessorios: newCar.acessorios,
        quantidadePassageiros: newCar.quantidadePassageiros,
      });
    });
  });
});
