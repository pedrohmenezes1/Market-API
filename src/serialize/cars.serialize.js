const serialize = ({ _id, modelo, cor, ano, quantidadePassageiros, acessorios }) => ({
  _id,
  modelo,
  cor,
  ano,
  quantidadePassageiros,
  acessorios,
});

module.exports = { serialize };
