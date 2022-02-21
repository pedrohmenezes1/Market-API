const mongoose = require('mongoose');
const httpStatus = require('http-status');
const httpMocks = require('node-mocks-http');
const { errorConverter, errorHandler } = require('../../../src/middlewares/error');
const MarketError = require('../../../src/utils/MarketError');
const config = require('../../../src/config/config');
const logger = require('../../../src/config/logger');

describe('Middlewares de erro', () => {
  describe('Conversor de erros', () => {
    test('deve retornar o mesmo objeto MarketError com o qual foi chamado', () => {
      const error = new MarketError(httpStatus.BAD_REQUEST, 'Qualquer erro');
      const next = jest.fn();

      errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith(error);
    });

    test('deve converter um erro para MarketError e preservar seu status e mensagem', () => {
      const error = new Error('Qualquer erro');
      error.statusCode = httpStatus.BAD_REQUEST;
      const next = jest.fn();

      errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith(expect.any(MarketError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: error.statusCode,
          message: error.message,
          isOperational: false,
        })
      );
    });

    test('deve converter um erro sem status para MarketError com status 500', () => {
      const error = new Error('Qualquer erro');
      const next = jest.fn();

      errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith(expect.any(MarketError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
          isOperational: false,
        })
      );
    });

    test('deve converter um erro sem mensagem para MarketError com mensagem padrão desse status http', () => {
      const error = new Error();
      error.statusCode = httpStatus.BAD_REQUEST;
      const next = jest.fn();

      errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith(expect.any(MarketError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: error.statusCode,
          message: httpStatus[error.statusCode],
          isOperational: false,
        })
      );
    });

    test('deve converter um erro do Mongoose para MarketError com status 400 e preservar sua mensagem', () => {
      const error = new mongoose.Error('Qualquer mongoose error');
      const next = jest.fn();

      errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith(expect.any(MarketError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: httpStatus.BAD_REQUEST,
          message: error.message,
          isOperational: false,
        })
      );
    });

    test('deve converter qualquer outro objeto para MarketError com status 500 e sua mensagem', () => {
      const error = {};
      const next = jest.fn();

      errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith(expect.any(MarketError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
          isOperational: false,
        })
      );
    });
  });

  describe('Manipulador de erros', () => {
    beforeEach(() => {
      jest.spyOn(logger, 'error').mockImplementation(() => {});
    });

    test('deve enviar a resposta de erro adequada e colocar a mensagem de erro em res.locals', () => {
      const error = new MarketError(httpStatus.BAD_REQUEST, 'Any error');
      const res = httpMocks.createResponse();
      const sendSpy = jest.spyOn(res, 'send');

      errorHandler(error, httpMocks.createRequest(), res);

      expect(sendSpy).toHaveBeenCalledWith(expect.objectContaining({ code: error.statusCode, message: error.message }));
      expect(res.locals.errorMessage).toBe(error.message);
    });

    test('deve colocar a pilha de erros na resposta se estiver no modo de desenvolvimento', () => {
      config.env = 'development';
      const error = new MarketError(httpStatus.BAD_REQUEST, 'Qualquer error');
      const res = httpMocks.createResponse();
      const sendSpy = jest.spyOn(res, 'send');

      errorHandler(error, httpMocks.createRequest(), res);

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({ code: error.statusCode, message: error.message, stack: error.stack })
      );
      config.env = process.env.NODE_ENV;
    });

    test('deve enviar o status e a mensagem de erro do servidor interno se estiver no modo de produção e o erro não estiver operacional', () => {
      config.env = 'production';
      const error = new MarketError(httpStatus.BAD_REQUEST, 'Qualquer error', false);
      const res = httpMocks.createResponse();
      const sendSpy = jest.spyOn(res, 'send');

      errorHandler(error, httpMocks.createRequest(), res);

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
        })
      );
      expect(res.locals.errorMessage).toBe(error.message);
      config.env = process.env.NODE_ENV;
    });

    test('deve preservar o status e a mensagem de erro original se estiver no modo de produção e o erro estiver operacional', () => {
      config.env = 'production';
      const error = new MarketError(httpStatus.BAD_REQUEST, 'Qualquer error');
      const res = httpMocks.createResponse();
      const sendSpy = jest.spyOn(res, 'send');

      errorHandler(error, httpMocks.createRequest(), res);

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          code: error.statusCode,
          message: error.message,
        })
      );
      config.env = process.env.NODE_ENV;
    });
  });
});
