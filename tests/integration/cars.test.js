const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { Cars } = require('../../src/models');
const { carOne, carTwo, insertCars } = require('../fixtures/cars.fixture');
const { peopleOne, insertPeoples } = require('../fixtures/people.fixture');
const { peopleOneAccessToken } = require('../fixtures/token.fixture');

setupTestDB();

describe('People routes', () => {
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

    test('deve retornar 201 e criar com sucesso um novo veículo se os dados estiverem corretos', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);

      const res = await request(app)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(newCar)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        id: expect.anything(),
        modelo: newCar.modelo,
        cor: newCar.cor,
        ano: newCar.ano,
        acessorios: expect.arrayContaining([]),
        quantidadePassageiros: newCar.quantidadePassageiros,
      });

      const dbCars = await Cars.findById(res.body.id);
      expect(dbCars).toBeDefined();
      expect(dbCars).toMatchObject({
        modelo: newCar.modelo,
        cor: newCar.cor,
        ano: newCar.ano,
        acessorios: expect.arrayContaining([]),
        quantidadePassageiros: newCar.quantidadePassageiros,
      });
    });

    test('deve retornar o erro 400 se o modelo tiver menos de 6 caracteres', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);
      newCar.modelo = 'bike';

      await request(app)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(newCar)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 400 se o ano for menor que 1950', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);
      newCar.ano = 1949;

      await request(app)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(newCar)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 400 se o ano for maior que o ano atual', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);
      newCar.ano = 2023;

      await request(app)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(newCar)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 400 se o veículo não tiver nenhum acessório', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);
      newCar.acessorios = [];

      await request(app)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(newCar)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 400 se o veículo tiver o mesmo acessório', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);
      newCar.acessorios = [{ descricao: 'Foguete' }, { descricao: 'Foguete' }];

      await request(app)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(newCar)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
  describe('GET /api/v1/people', () => {
    test('deve retornar 200 e aplicar as opções de consulta padrão', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);

      const res = await request(app)
        .get('/api/v1/car')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        limit: 100,
        total: 1,
        offset: 1,
        offsets: 1,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0]).toEqual({
        id: carOne._id.toHexString(),
        modelo: carOne.modelo,
        cor: carOne.cor,
        ano: carOne.ano,
        acessorios: expect.arrayContaining([]),
        quantidadePassageiros: carOne.quantidadePassageiros,
      });
    });

    test('deve retornar 401 se o token de acesso estiver ausente', async () => {
      await insertCars([carOne]);

      await request(app).get('/api/v1/car').send().expect(httpStatus.UNAUTHORIZED);
    });

    test('deve aplicar corretamente o filtro no campo de modelo', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);

      const res = await request(app)
        .get('/api/v1/car')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .query({ modelo: carOne.modelo })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        limit: 100,
        total: 1,
        offset: 1,
        offsets: 1,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(carOne._id.toHexString());
    });

    test('deve aplicar corretamente o filtro no campo de cor', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);

      const res = await request(app)
        .get('/api/v1/car')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .query({ cor: carOne.cor })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        limit: 100,
        total: 1,
        offset: 1,
        offsets: 1,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(carOne._id.toHexString());
    });

    test('deve aplicar corretamente o filtro no campo de ano', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);

      const res = await request(app)
        .get('/api/v1/car')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .query({ ano: carOne.ano })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        limit: 100,
        total: 1,
        offset: 1,
        offsets: 1,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(carOne._id.toHexString());
    });

    test('deve aplicar corretamente o filtro no campo de acessórios', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);

      const res = await request(app)
        .get('/api/v1/car')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .query({ acessorios: carOne.acessorios.descricao })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        limit: 100,
        total: 1,
        offset: 1,
        offsets: 1,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(carOne._id.toHexString());
    });
  });

  describe('GET /api/v1/car/:carsId', () => {
    test('deve retornar 200 e o objeto do veículo se os dados estiverem ok', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);

      const res = await request(app)
        .get(`/api/v1/car/${carOne._id}`)
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: carOne._id.toHexString(),
        modelo: carOne.modelo,
        cor: carOne.cor,
        ano: carOne.ano,
        acessorios: expect.arrayContaining([]),
        quantidadePassageiros: carOne.quantidadePassageiros,
      });
    });

    test('deve retornar 401 se o token de acesso estiver ausente', async () => {
      await insertCars([carOne]);

      await request(app).get(`/api/v1/car/${carOne._id}`).send().expect(httpStatus.UNAUTHORIZED);
    });

    test('deve retornar o erro 400 se carsId não for um ID válido do mongo', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);

      await request(app)
        .get('/api/v1/car/invalidId')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 404 se o veículo não for encontrado', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);

      await request(app)
        .get(`/api/v1/car/${carTwo._id}`)
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe('DELETE /api/v1/car/:carsId', () => {
    test('deve retornar 204 se os dados estiverem ok', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);

      await request(app)
        .delete(`/api/v1/car/${carOne._id}`)
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send()
        .expect(httpStatus.NO_CONTENT);

      const dbCars = await Cars.findById(carOne._id);
      expect(dbCars).toBeNull();
    });

    test('deve retornar o erro 401 se o token de acesso estiver ausente', async () => {
      await insertCars([carOne]);

      await request(app).delete(`/api/v1/car/${carOne._id}`).send().expect(httpStatus.UNAUTHORIZED);
    });

    test('deve retornar o erro 400 se carsId não for um ID válido do mongo', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);

      await request(app)
        .delete('/api/v1/car/invalidId')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 404 se o veículo não existir no banco de dados', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);

      await request(app)
        .delete(`/api/v1/car/${carTwo._id}`)
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe('PUT /api/v1/car/:carsId', () => {
    test('deve retornar 200 e atualizar um veículo com sucesso se os dados estiverem ok', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);

      const updateBody = {
        modelo: 'Honda Civic',
        cor: 'Preto',
        ano: 2018,
        acessorios: [
          { descricao: 'Ar-Condicionado' },
          { descricao: 'Dir. Hidráulica' },
          { descricao: 'Trava Elétrica' },
          { descricao: 'Vidro Blindado' },
        ],
        quantidadePassageiros: 4,
      };

      await request(app)
        .put(`/api/v1/car/${carOne._id}`)
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.OK);

      const dbCars = await Cars.findById(carOne._id);
      expect(dbCars).toBeDefined();
      expect(dbCars).toMatchObject({
        id: carOne._id.toHexString(),
        modelo: updateBody.modelo,
        cor: updateBody.cor,
        ano: updateBody.ano,
        acessorios: expect.arrayContaining([]),
        quantidadePassageiros: updateBody.quantidadePassageiros,
      });
    });

    test('deve retornar o erro 401 se o token de acesso estiver ausente', async () => {
      await insertCars([carOne]);

      await request(app).put(`/api/v1/car/${carOne._id}`).send().expect(httpStatus.UNAUTHORIZED);
    });

    test('deve retornar o erro 400 se carsId não for um ID válido do mongo', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);

      await request(app)
        .put('/api/v1/car/invalidId')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 400 se o modelo tiver menos de 6 caracteres', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);

      const updateBody = { modelo: 'bike' };

      await request(app)
        .put(`/api/v1/car/${carOne._id}`)
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 400 se o ano for menor que 1950', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);

      const updateBody = { ano: 1949 };

      await request(app)
        .put(`/api/v1/car/${carOne._id}`)
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 400 se o ano for maior que o ano atual', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);

      const updateBody = { ano: 2023 };

      await request(app)
        .put(`/api/v1/car/${carOne._id}`)
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 400 se o veículo não tiver nenhum acessório', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);

      const updateBody = { acessorios: [] };

      await request(app)
        .put(`/api/v1/car/${carOne._id}`)
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 400 se o veículo tiver o mesmo acessório', async () => {
      await insertPeoples([peopleOne]);
      await insertCars([carOne]);

      const updateBody = { acessorios: [{ descricao: 'Foguete' }, { descricao: 'Foguete' }] };

      await request(app)
        .put(`/api/v1/car/${carOne._id}`)
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
});
