const faker = require('faker-br');
const { People } = require('../../../src/models');

describe('People model', () => {
  describe('People validation', () => {
    let newPeople;
    beforeEach(() => {
      newPeople = {
        nome: faker.name.findName(),
        cpf: '195.154.252-85',
        data_nascimento: '13/01/2001',
        email: faker.internet.email().toLowerCase(),
        senha: 'password1',
        habilitado: 'sim',
      };
    });

    test('deve validar corretamente uma pessoa válida', async () => {
      await expect(new People(newPeople).validate()).resolves.toBeUndefined();
    });

    test('deve lançar um erro de validação se o cpf for inválido', async () => {
      newPeople.cpf = '18915x8155955';
      await expect(new People(newPeople).validate()).rejects.toThrow();
    });

    test('deve lançar um erro de validação se o email for inválido', async () => {
      newPeople.email = 'invalidEmail';
      await expect(new People(newPeople).validate()).rejects.toThrow();
    });

    test('deve lançar um erro de validação se o comprimento da senha for menor que 6 caracteres', async () => {
      newPeople.senha = 'pass1';
      await expect(new People(newPeople).validate()).rejects.toThrow();
    });

    test('deve lançar um erro de validação se a senha não contiver números', async () => {
      newPeople.senha = 'password';
      await expect(new People(newPeople).validate()).rejects.toThrow();
    });

    test('deve lançar um erro de validação se a senha não contiver letras', async () => {
      newPeople.senha = '11111111';
      await expect(new People(newPeople).validate()).rejects.toThrow();
    });

    test('deve lançar um erro de validação se habilitado não for sim ou Não', async () => {
      newPeople.habilitado = 'invalid';
      await expect(new People(newPeople).validate()).rejects.toThrow();
    });
  });

  describe('People toJSON()', () => {
    test('não deve retornar a senha do usuário quando o toJSON for chamado', () => {
      const newPeople = {
        nome: faker.name.findName(),
        cpf: '192.168.232-43',
        data_nascimento: '10/06/2001',
        email: faker.internet.email().toLowerCase(),
        senha: 'password1',
        habilitado: 'sim',
      };
      expect(new People(newPeople).toJSON()).not.toHaveProperty('password');
    });
  });
});
