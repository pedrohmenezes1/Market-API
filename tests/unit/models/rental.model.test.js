const { Rental } = require('../../../src/models');

describe('Rental model', () => {
  describe('Rental validation', () => {
    let newRental;
    beforeEach(() => {
      newRental = {
        nome: 'Localiza Rent a Car',
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
    });

    test('deve validar corretamente uma locadora válida', async () => {
      await expect(new Rental(newRental).validate()).resolves.toBeUndefined();
    });

    test('deve lançar um erro de validação se o cnpj for inválido', async () => {
      newRental.cnpj = 'invalidCnpj';
      await expect(new Rental(newRental).validate()).rejects.toThrow();
    });

    test('deve lançar um erro de validação se o cep for inválido', async () => {
      newRental.endereco = { cep: 'invalidCep' };
      await expect(new Rental(newRental).validate()).rejects.toThrow();
    });

    test('deve lançar um erro de validação se isFilial não for boleano', async () => {
      newRental.endereco = { isFilial: 'invalidFilial' };
      await expect(new Rental(newRental).validate()).rejects.toThrow();
    });
  });
});
