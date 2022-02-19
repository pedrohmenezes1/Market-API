const { Cars } = require('../../../src/models');

describe('Cars model', () => {
  describe('Cars validation', () => {
    let newCar;
    beforeEach(() => {
      newCar = {
        modelo: 'Honda Civic',
        cor: 'Preto',
        ano: 2018,
        acessorios: [
          {
            descricao: '4 Portas',
          },
          {
            descricao: 'ArCondicionado',
          },
        ],
        quantidadePassageiros: 4,
      };
    });

    test('deve validar corretamente um carro válido', async () => {
      await expect(new Cars(newCar).validate()).resolves.toBeUndefined();
    });

    test('deve lançar um erro de validação se o ano for menor que 1950', async () => {
      newCar.ano = 1949;
      await expect(new Cars(newCar).validate()).rejects.toThrow();
    });
    test('deve lançar um erro de validação se o ano for maior que 2022', async () => {
      newCar.ano = 2023;
      await expect(new Cars(newCar).validate()).rejects.toThrow();
    });

    test('deve lançar um erro de validação se não tiver ao menos 1 acessório no veículo', async () => {
      newCar.acessorios.descricao = null;
      await expect(new Cars(newCar).validate()).rejects.toThrow();
    });
  });
});
