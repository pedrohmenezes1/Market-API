const request = require('supertest');
const httpStatus = require('http-status');
const httpMocks = require('node-mocks-http');
const moment = require('moment');
const app = require('../../src/app');
const config = require('../../src/config/config');
const auth = require('../../src/middlewares/auth');
const { tokenService } = require('../../src/services');
const MarketError = require('../../src/utils/MarketError');
const setupTestDB = require('../utils/setupTestDB');
const { tokenTypes } = require('../../src/config/tokens');
const { peopleOne, insertPeople } = require('../fixtures/people.fixture');
const { peopleOneAccessToken } = require('../fixtures/token.fixture');

setupTestDB();

describe('Auth routes', () => {
  describe('POST /api/v1/authenticate', () => {
    test('deve retornar 200 e fazer login de pessoas se o email e a senha corresponderem', async () => {
      await insertPeople([peopleOne]);
      const loginCredentials = {
        email: peopleOne.email,
        senha: peopleOne.senha,
      };

      const res = await request(app).post('/api/v1/authenticate').send(loginCredentials).expect(httpStatus.OK);

      expect(res.body.people).toEqual({
        id: peopleOne._id.toHexString(),
        nome: peopleOne.nome,
        cpf: peopleOne.cpf,
        data_nascimento: peopleOne.data_nascimento,
        email: peopleOne.email,
        habilitado: peopleOne.habilitado,
      });

      expect(res.body.tokens).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
      });
    });

    test('deve retornar o erro 401 se não houver pessoas com esse e-mail', async () => {
      const loginCredentials = {
        email: peopleOne.email,
        senha: peopleOne.senha,
      };

      const res = await request(app).post('/api/v1/authenticate').send(loginCredentials).expect(httpStatus.UNAUTHORIZED);

      expect(res.body).toEqual({ code: httpStatus.UNAUTHORIZED, message: 'Senha ou email incorretos' });
    });

    test('deve retornar erro 401 se a senha estiver errada', async () => {
      await insertPeople([peopleOne]);
      const loginCredentials = {
        email: peopleOne.email,
        senha: 'senhaErrada1',
      };

      const res = await request(app).post('/api/v1/authenticate').send(loginCredentials).expect(httpStatus.UNAUTHORIZED);

      expect(res.body).toEqual({ code: httpStatus.UNAUTHORIZED, message: 'Senha ou email incorretos' });
    });
  });

  describe('Middleware de autenticação', () => {
    test('deve chamar next sem erros se o token de acesso for válido', async () => {
      await insertPeople([peopleOne]);
      const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${peopleOneAccessToken}` } });
      const next = jest.fn();

      await auth()(req, httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith();
      expect(req.people._id).toEqual(peopleOne._id);
    });

    test('deve chamar next com erro não autorizado se o token de acesso não for encontrado no cabeçalho', async () => {
      await insertPeople([peopleOne]);
      const req = httpMocks.createRequest();
      const next = jest.fn();

      await auth()(req, httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith(expect.any(MarketError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Por favor, autentique-se' })
      );
    });

    test('deve chamar next com erro não autorizado se o token de acesso não for um token jwt válido', async () => {
      await insertPeople([peopleOne]);
      const req = httpMocks.createRequest({ headers: { Authorization: 'Bearer randomToken' } });
      const next = jest.fn();

      await auth()(req, httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith(expect.any(MarketError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Por favor, autentique-se' })
      );
    });

    test('deve chamar next com erro não autorizado se o token de acesso for gerado com um segredo inválido', async () => {
      await insertPeople([peopleOne]);
      const expires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
      const accessToken = tokenService.generateToken(peopleOne._id, expires, tokenTypes.ACCESS, 'invalidSecret');
      const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${accessToken}` } });
      const next = jest.fn();

      await auth()(req, httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith(expect.any(MarketError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Por favor, autentique-se' })
      );
    });

    test('deve chamar next com erro não autorizado se o token de acesso expirou', async () => {
      await insertPeople([peopleOne]);
      const expires = moment().subtract(1, 'minutes');
      const accessToken = tokenService.generateToken(peopleOne._id, expires, tokenTypes.ACCESS);
      const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${accessToken}` } });
      const next = jest.fn();

      await auth()(req, httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith(expect.any(MarketError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Por favor, autentique-se' })
      );
    });

    test('deve chamar next com erro não autorizado se a pessoa não for encontrada', async () => {
      const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${peopleOneAccessToken}` } });
      const next = jest.fn();

      await auth()(req, httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith(expect.any(MarketError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Por favor, autentique-se' })
      );
    });
  });
});
