const moment = require('moment');
// eslint-disable-next-line camelcase
const serialize = ({ id, nome, cpf, data_nascimento, email, habilitado }) => ({
  id,
  nome,
  cpf,
  data_nascimento: moment(data_nascimento).utc().format('DD/MM/YYYY'),
  email,
  habilitado,
});

module.exports = { serialize };
