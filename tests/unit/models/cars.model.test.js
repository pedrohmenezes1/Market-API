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

    test('deve lançar um erro de validação se o ano não for número', async () => {
      newCar.ano = 'invalidYear';
      await expect(new Cars(newCar).validate()).rejects.toThrow();
    });

    test('deve lançar um erro de validação se a cor não for válida', async () => {
      newCar.cor = 'cor';
      await expect(new Cars(newCar).validate()).rejects.toThrow();
    });

    test('deve lançar um erro de validação se o veículo não tiver nenhum acessório', async () => {
      newCar.acessorios = { descricao: [] };
      await expect(new Cars(newCar).validate()).rejects.toThrow();
    });

    test('deve lançar um erro de validação se a quantidadePassageiros não for número', async () => {
      newCar.quantidadePassageiros = 'invalidPassageiros';
      await expect(new Cars(newCar).validate()).rejects.toThrow();
    });
  });
});
