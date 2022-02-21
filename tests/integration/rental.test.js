const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { Rental } = require('../../src/models');
const { rentalOne, rentalTwo, insertRentals } = require('../fixtures/rental.fixture');
const { peopleOne, insertPeoples } = require('../fixtures/people.fixture');
const { peopleOneAccessToken } = require('../fixtures/token.fixture');

setupTestDB();

describe('Rental routes', () => {
  describe('POST /api/v1/rental', () => {
    let newRental;

    beforeEach(() => {
      newRental = {
        nome: 'Pedroliso locadora de fusca',
        cnpj: '16.670.075/0002-55',
        atividades: 'Aluguel de fusca E Gestão de Frotas',
        endereco: [
          {
            cep: '49025-850',
            number: 4321,
            isFilial: false,
          },
          {
            cep: '69317-586',
            number: 87654,
            complemento: 'Muro C',
            isFilial: true,
          },
        ],
      };
    });

    test('deve retornar 201 e criar com sucesso uma nova locadora da pedroliso', async () => {
      await insertPeoples([peopleOne]);
      await insertRentals([rentalOne]);

      const res = await request(app)
        .post('/api/v1/rental')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(newRental)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        id: expect.anything(),
        nome: newRental.nome,
        cnpj: newRental.cnpj,
        atividades: newRental.atividades,
        endereco: expect.arrayContaining([]),
      });

      const dbRental = await Rental.findById(res.body.id);
      expect(dbRental).toBeDefined();
      expect(dbRental).toMatchObject({
        nome: newRental.nome,
        cnpj: newRental.cnpj,
        atividades: newRental.atividades,
        endereco: expect.arrayContaining([]),
      });
    });

    test('deve retornar o erro 400 se houver duas matrizes', async () => {
      await insertPeoples([peopleOne]);
      await insertRentals([rentalOne]);
      newRental.endereco = [{ isFilial: false }, { isFilial: false }];

      await request(app)
        .post('/api/v1/rental')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(newRental)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 409 se houver dois cnpj', async () => {
      await insertPeoples([peopleOne]);
      await insertRentals([rentalTwo]);
      newRental.cnpj = rentalTwo.cnpj;

      await request(app)
        .post('/api/v1/rental')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(newRental)
        .expect(httpStatus.CONFLICT);
    });

    test('deve retornar o erro 400 se o cnpj for incorreto', async () => {
      await insertPeoples([peopleOne]);
      await insertRentals([rentalOne]);
      newRental.cnpj = 'invalidCnpj';

      await request(app)
        .post('/api/v1/rental')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(newRental)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 400 se o cep for incorreto', async () => {
      await insertPeoples([peopleOne]);
      await insertRentals([rentalOne]);
      newRental.endereco = { cep: 'invalidCep' };

      await request(app)
        .post('/api/v1/rental')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(newRental)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 400 se o number não for um número', async () => {
      await insertPeoples([peopleOne]);
      await insertRentals([rentalOne]);
      newRental.endereco = { number: 'invalidNumber' };

      await request(app)
        .post('/api/v1/rental')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(newRental)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET /api/v1/rental', () => {
    test('deve retornar 200 e aplicar as opções de consulta padrão', async () => {
      await insertPeoples([peopleOne]);
      await insertRentals([rentalOne]);

      const res = await request(app)
        .get('/api/v1/rental')
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
        id: expect.anything(),
        nome: rentalOne.nome,
        cnpj: rentalOne.cnpj,
        atividades: rentalOne.atividades,
        endereco: expect.arrayContaining([]),
      });
    });

    test('deve retornar 401 se o token de acesso estiver ausente', async () => {
      await insertRentals([rentalOne]);

      await request(app).get('/api/v1/rental').send().expect(httpStatus.UNAUTHORIZED);
    });

    test('deve aplicar corretamente o filtro no campo de nome', async () => {
      await insertPeoples([peopleOne]);
      await insertRentals([rentalOne]);

      const res = await request(app)
        .get('/api/v1/rental')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .query({ nome: rentalOne.modelo })
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
      expect(res.body.results[0].id).toBe(rentalOne._id.toHexString());
    });

    test('deve aplicar corretamente o filtro no campo de cnpj', async () => {
      await insertPeoples([peopleOne]);
      await insertRentals([rentalOne]);

      const res = await request(app)
        .get('/api/v1/rental')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .query({ cnpj: rentalOne.cnpj })
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
      expect(res.body.results[0].id).toBe(rentalOne._id.toHexString());
    });

    test('deve aplicar corretamente o filtro no campo de atividades', async () => {
      await insertPeoples([peopleOne]);
      await insertRentals([rentalOne]);

      const res = await request(app)
        .get('/api/v1/rental')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .query({ atividades: rentalOne.atividades })
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
      expect(res.body.results[0].id).toBe(rentalOne._id.toHexString());
    });

    test('deve aplicar corretamente o filtro no campo de endereco.cep', async () => {
      await insertPeoples([peopleOne]);
      await insertRentals([rentalOne]);

      const res = await request(app)
        .get('/api/v1/rental')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .query({ endereco: rentalOne.endereco.cep })
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
      expect(res.body.results[0].id).toBe(rentalOne._id.toHexString());
    });

    test('deve aplicar corretamente o filtro no campo de endereco.logradouro', async () => {
      await insertPeoples([peopleOne]);
      await insertRentals([rentalOne]);

      const res = await request(app)
        .get('/api/v1/rental')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .query({ endereco: rentalOne.endereco.logradouro })
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
      expect(res.body.results[0].id).toBe(rentalOne._id.toHexString());
    });

    test('deve aplicar corretamente o filtro no campo de endereco.complemento', async () => {
      await insertPeoples([peopleOne]);
      await insertRentals([rentalOne]);

      const res = await request(app)
        .get('/api/v1/rental')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .query({ endereco: rentalOne.endereco.complemento })
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
      expect(res.body.results[0].id).toBe(rentalOne._id.toHexString());
    });

    test('deve aplicar corretamente o filtro no campo de endereco.bairro', async () => {
      await insertPeoples([peopleOne]);
      await insertRentals([rentalOne]);

      const res = await request(app)
        .get('/api/v1/rental')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .query({ endereco: rentalOne.endereco.bairro })
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
      expect(res.body.results[0].id).toBe(rentalOne._id.toHexString());
    });

    test('deve aplicar corretamente o filtro no campo de endereco.number', async () => {
      await insertPeoples([peopleOne]);
      await insertRentals([rentalOne]);

      const res = await request(app)
        .get('/api/v1/rental')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .query({ endereco: rentalOne.endereco.number })
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
      expect(res.body.results[0].id).toBe(rentalOne._id.toHexString());
    });

    test('deve aplicar corretamente o filtro no campo de endereco.localidade', async () => {
      await insertPeoples([peopleOne]);
      await insertRentals([rentalOne]);

      const res = await request(app)
        .get('/api/v1/rental')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .query({ endereco: rentalOne.endereco.localidade })
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
      expect(res.body.results[0].id).toBe(rentalOne._id.toHexString());
    });

    test('deve aplicar corretamente o filtro no campo de endereco.uf', async () => {
      await insertPeoples([peopleOne]);
      await insertRentals([rentalOne]);

      const res = await request(app)
        .get('/api/v1/rental')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .query({ endereco: rentalOne.endereco.uf })
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
      expect(res.body.results[0].id).toBe(rentalOne._id.toHexString());
    });
  });

  describe('GET /api/v1/rental/:rentalId', () => {
    test('deve retornar 200 e o objeto da locadora se os dados estiverem ok', async () => {
      await insertPeoples([peopleOne]);
      await insertRentals([rentalOne]);

      const res = await request(app)
        .get(`/api/v1/rental/${rentalOne._id}`)
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: rentalOne._id.toHexString(),
        nome: rentalOne.nome,
        cnpj: rentalOne.cnpj,
        atividades: rentalOne.atividades,
        endereco: expect.arrayContaining([]),
      });
    });

    test('deve retornar 401 se o token de acesso estiver ausente', async () => {
      await insertRentals([rentalOne]);

      await request(app).get(`/api/v1/rental/${rentalOne._id}`).send().expect(httpStatus.UNAUTHORIZED);
    });

    test('deve retornar o erro 400 se rentalId não for um ID válido do mongo', async () => {
      await insertPeoples([peopleOne]);
      await insertRentals([rentalOne]);

      await request(app)
        .get('/api/v1/rental/invalidId')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 404 se o veículo não for encontrado', async () => {
      await insertPeoples([peopleOne]);
      await insertRentals([rentalOne]);

      await request(app)
        .get(`/api/v1/rental/${rentalTwo._id}`)
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });
});
