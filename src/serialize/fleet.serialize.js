// eslint-disable-next-line camelcase
const serialize = ({ id, id_carro, id_locadora, status, valor_diaria, placa }) => ({
  id,
  id_carro,
  id_locadora,
  status,
  valor_diaria,
  placa,
});

module.exports = { serialize };
