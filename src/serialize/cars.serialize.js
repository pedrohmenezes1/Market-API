const serialize = ({ id, modelo, cor, ano, quantidadePassageiros, acessorios }) => ({
  id,
  modelo,
  cor,
  ano,
  acessorios,
  quantidadePassageiros,
});

module.exports = { serialize };
