const serialize = ({ _id, modelo, cor, ano, quantidadePassageiros, acessorios }) => ({
  _id,
  modelo,
  cor,
  ano,
  acessorios,
  quantidadePassageiros,
});

const paginateSerialize = ({ docs, limit, totalDocs, pagingCounter, totalPages }) => ({
  veiculos: docs.map(serialize),
  limit,
  total: totalDocs,
  offset: pagingCounter,
  offsets: totalPages,
});

module.exports = { serialize, paginateSerialize };
