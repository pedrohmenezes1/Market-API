const moment = require('moment');

// eslint-disable-next-line camelcase
const serialize = ({ _id, nome, cpf, data_nascimento, email, habilitado }) => ({
  _id,
  nome,
  cpf,
  data_nascimento: moment(data_nascimento).utc().format('DD/MM/YYYY'),
  email,
  habilitado,
});

const paginateSerialize = ({ docs, limit, totalDocs, pagingCounter, totalPages }) => ({
  people: docs.map(serialize),
  limit,
  total: totalDocs,
  offset: pagingCounter,
  offsets: totalPages,
});

module.exports = { serialize, paginateSerialize };
