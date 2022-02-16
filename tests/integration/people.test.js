const request = require('supertest');
const faker = require('faker-br');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { People } = require('../../src/models');
const { peopleOne, peopleTwo, insertPeoples } = require('../fixtures/people.fixture');
const { peopleOneAccessToken, peopleTwoAccessToken } = require('../fixtures/token.fixture');

setupTestDB();

describe('People routes', () => {
  describe('POST /api/v1/people', () => {
    let newPeople;

    beforeEach(() => {
      newPeople = {
        nome: faker.name.findName(),
        cpf: '192.164.151-99',
        data_nascimento: '23/08/1998',
        email: faker.internet.email().toLowerCase(),
        senha: 'password1',
        habilitado: 'Sim',
      };
    });

    test('deve retornar 201 e criar com sucesso um novo usuário se os dados estiverem corretos', async () => {
      await insertPeoples([peopleOne]);

      const res = await request(app).post('/api/v1/people').send(newPeople).expect(httpStatus.CREATED);

      expect(res.body).not.toHaveProperty('senha');
      expect(res.body).toEqual({
        id: expect.anything(),
        nome: newPeople.nome,
        cpf: newPeople.cpf,
        data_nascimento: newPeople.data_nascimento,
        email: newPeople.email,
        habilitado: newPeople.habilitado,
      });

      const dbPeople = await People.findById(res.body.id);
      expect(dbPeople).toBeDefined();
      expect(dbPeople.senha).not.toBe(newPeople.senha);
      expect(dbPeople).toMatchObject({
        nome: newPeople.nome,
        cpf: newPeople.cpf,
        data_nascimento: newPeople.data_nascimento,
        email: newPeople.email,
        habilitado: newPeople.habilitado,
      });
    });

    test('deve retornar o erro 400 se o nome tiver menos de 5 caracteres', async () => {
      await insertPeoples([peopleOne]);
      newPeople.nome = 'ped';

      await request(app).post('/api/v1/people').send(newPeople).expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 400 se o email for inválido', async () => {
      await insertPeoples([peopleOne]);
      newPeople.email = 'emailInválido';

      await request(app).post('/api/v1/people').send(newPeople).expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 400 se o email já estiver sendo usado', async () => {
      await insertPeoples([peopleOne]);
      newPeople.email = peopleOne.email;

      await request(app).post('/api/v1/people').send(newPeople).expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 400 se o comprimento da senha for menor que 6 caracteres', async () => {
      await insertPeoples([peopleOne]);
      newPeople.senha = 'pass1';

      await request(app).post('/api/v1/people').send(newPeople).expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 400 se a senha não contiver letras e números', async () => {
      await insertPeoples([peopleOne]);
      newPeople.senha = 'password';

      await request(app).post('/api/v1/people').send(newPeople).expect(httpStatus.BAD_REQUEST);

      newPeople.senha = '1111111';

      await request(app).post('/api/v1/people').send(newPeople).expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 400 se o formato do cpf não for xxx.xxx.xxx-xx', async () => {
      await insertPeoples([peopleOne]);
      newPeople.cpf = '131.137.810-999';

      await request(app).post('/api/v1/people').send(newPeople).expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 400 se a data_nascimento for menor que 18 anos', async () => {
      await insertPeoples([peopleOne]);
      newPeople.data_nascimento = '03/01/2017';

      await request(app).post('/api/v1/people').send(newPeople).expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET /api/v1/people', () => {
    test('deve retornar 200 e aplicar as opções de consulta padrão', async () => {
      await insertPeoples([peopleOne, peopleTwo]);

      const res = await request(app)
        .get('/api/v1/people')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        limit: 100,
        total: 1,
        offset: 1,
        offsets: 2,
      });
      expect(res.body.results).toHaveLength(2);
      expect(res.body.results[0]).toEqual({
        id: peopleOne._id.toHexString(),
        nome: peopleOne.nome,
        cpf: peopleOne.cpf,
        data_nascimento: peopleOne.data_nascimento,
        email: peopleOne.email,
        habilitado: peopleOne.habilitado,
      });
    });

    test('deve retornar 401 se o token de acesso estiver ausente', async () => {
      await insertPeoples([peopleOne, peopleTwo]);

      await request(app).get('/api/v1/people').send().expect(httpStatus.UNAUTHORIZED);
    });

    test('deve aplicar corretamente o filtro no campo de nome', async () => {
      await insertPeoples([peopleOne, peopleTwo]);

      const res = await request(app)
        .get('/api/v1/people')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .query({ nome: peopleOne.nome })
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
      expect(res.body.results[0].id).toBe(peopleOne._id.toHexString());
    });

    test('deve aplicar corretamente o filtro no campo de cpf', async () => {
      await insertPeoples([peopleOne, peopleTwo]);

      const res = await request(app)
        .get('/api/v1/people')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .query({ cpf: peopleOne.cpf })
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
      expect(res.body.results[0].id).toBe(peopleOne._id.toHexString());
    });

    test('deve aplicar corretamente o filtro no campo de email', async () => {
      await insertPeoples([peopleOne, peopleTwo]);

      const res = await request(app)
        .get('/api/v1/people')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .query({ email: peopleOne.email })
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
      expect(res.body.results[0].id).toBe(peopleOne._id.toHexString());
    });

    test('deve aplicar corretamente o filtro no campo de habilitado', async () => {
      await insertPeoples([peopleOne, peopleTwo]);

      const res = await request(app)
        .get('/api/v1/people')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .query({ habilitado: peopleOne.habilitado })
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
      expect(res.body.results[0].id).toBe(peopleOne._id.toHexString());
    });
  });

  describe('GET /api/v1/people/:peopleId', () => {
    test('deve retornar 200 e o objeto da pessoa se os dados estiverem ok', async () => {
      await insertPeoples([peopleOne]);

      const res = await request(app)
        .get(`/api/v1/people/${peopleOne._id}`)
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).not.toHaveProperty('senha');
      expect(res.body).toEqual({
        id: peopleOne._id.toHexString(),
        nome: peopleOne.nome,
        cpf: peopleOne.cpf,
        data_nascimento: peopleOne.data_nascimento,
        email: peopleOne.email,
        habilitado: peopleOne.habilitado,
      });
    });

    test('deve retornar o erro 401 se o token de acesso estiver ausente', async () => {
      await insertPeoples([peopleOne]);

      await request(app).get(`/api/v1/people/${peopleOne._id}`).send().expect(httpStatus.UNAUTHORIZED);
    });

    test('deve retornar o erro 400 se peopleId não for um ID válido do mongo', async () => {
      await insertPeoples([peopleOne]);

      await request(app)
        .get('/api/v1/people/invalidId')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 404 se a pessoa não for encontrada', async () => {
      await insertPeoples([peopleTwo]);

      await request(app)
        .get(`/api/v1/people/${peopleOne._id}`)
        .set('Authorization', `Bearer ${peopleTwoAccessToken}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe('DELETE /api/v1/people/:peopleId', () => {
    test('deve retornar 204 se os dados estiverem ok', async () => {
      await insertPeoples([peopleOne]);

      await request(app)
        .delete(`/api/v1/people/${peopleOne._id}`)
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send()
        .expect(httpStatus.NO_CONTENT);

      const dbPeople = await People.findById(peopleOne._id);
      expect(dbPeople).toBeNull();
    });

    test('deve retornar o erro 401 se o token de acesso estiver ausente', async () => {
      await insertPeoples([peopleOne]);

      await request(app).delete(`/api/v1/people/${peopleOne._id}`).send().expect(httpStatus.UNAUTHORIZED);
    });

    test('deve retornar o erro 400 se peopleId não for um ID válido do mongo', async () => {
      await insertPeoples([peopleOne]);

      await request(app)
        .delete('/api/v1/people/invalidId')
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar o erro 404 se a pessoa não existir no banco de dados', async () => {
      await insertPeoples([peopleTwo]);

      await request(app)
        .delete(`/api/v1/people/${peopleOne._id}`)
        .set('Authorization', `Bearer ${peopleTwoAccessToken}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe('PUT /api/v1/people/:peopleId', () => {
    test('deve retornar 200 e atualizar a pessoa com sucesso se os dados estiverem ok', async () => {
      await insertPeoples([peopleOne]);
      const updateBody = {
        nome: faker.name.findName(),
        cpf: '192.151.485-95',
        data_nascimento: '23/08/2001',
        email: faker.internet.email().toLowerCase(),
        senha: 'novaSenha1',
        habilitado: 'Não',
      };

      await request(app)
        .put(`/api/v1/people/${peopleOne._id}`)
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.OK);

      const dbPeople = await People.findById(peopleOne._id);
      expect(dbPeople).toBeDefined();
      expect(dbPeople.senha).not.toBe(updateBody.senha);
      expect(dbPeople).toMatchObject({
        nome: updateBody.nome,
        cpf: updateBody.cpf,
        data_nascimento: updateBody.data_nascimento,
        email: updateBody.email,
        habilitado: updateBody.habilitado,
      });
    });

    test('deve retornar o erro 401 se o token de acesso estiver ausente', async () => {
      await insertPeoples([peopleOne]);
      const updateBody = { nome: faker.name.findName() };

      await request(app).put(`/api/v1/people/${peopleOne._id}`).send(updateBody).expect(httpStatus.UNAUTHORIZED);
    });

    test('deve retornar o erro 400 se peopleId não for um ID válido do mongo', async () => {
      await insertPeoples([peopleOne]);
      const updateBody = { nome: faker.name.findName() };

      await request(app)
        .put(`/api/v1/people/invalidId`)
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar 400 se o email for inválido', async () => {
      await insertPeoples([peopleOne]);
      const updateBody = { email: 'invalidEmail' };

      await request(app)
        .put(`/api/v1/people/${peopleOne._id}`)
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar 400 se o e-mail já estiver em uso', async () => {
      await insertPeoples([peopleOne, peopleTwo]);
      const updateBody = { email: peopleTwo.email };

      await request(app)
        .put(`/api/v1/people/${peopleOne._id}`)
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar 400 se o comprimento da senha for menor que 6 caracteres', async () => {
      await insertPeoples([peopleOne]);
      const updateBody = { senha: 'pass1' };

      await request(app)
        .put(`/api/v1/people/${peopleOne._id}`)
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('deve retornar 400 se a senha não contiver letras e números', async () => {
      await insertPeoples([peopleOne]);
      const updateBody = { senha: 'password' };

      await request(app)
        .put(`/api/v1/people/${peopleOne._id}`)
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);

      updateBody.password = '11111111';

      await request(app)
        .put(`/api/v1/people/${peopleOne._id}`)
        .set('Authorization', `Bearer ${peopleOneAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
});
