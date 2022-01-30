const serialize = ({ _id, modelo, cor, ano, quantidadePassageiros, acessorios }) => ({
  _id,
  modelo,
  cor,
  ano,
  acessorios,
  quantidadePassageiros,
});

module.exports = { serialize };
