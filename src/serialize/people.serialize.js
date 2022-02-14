// eslint-disable-next-line camelcase
const serialize = ({ _id, nome, cpf, data_nascimento, email, habilitado }) => ({
  _id,
  nome,
  cpf,
  data_nascimento,
  email,
  habilitado,
});

module.exports = { serialize };
