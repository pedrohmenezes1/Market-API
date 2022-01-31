const serialize = ({ _id, modelo, cor, ano, quantidadePassageiros, acessorios }) => ({
  _id,
  modelo,
  cor,
  ano,
  acessorios,
  quantidadePassageiros,
});

const paginateSerialize = ({ docs, total, limit, offset, offsets }) => ({
  veiculos: docs.map(serialize),
  limit,
  total,
  offset,
  offsets,
});

module.exports = { serialize, paginateSerialize };
