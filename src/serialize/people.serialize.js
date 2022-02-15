// eslint-disable-next-line camelcase
const serialize = ({ nome, cpf, data_nascimento, email, habilitado, id }) => ({
  nome,
  cpf,
  data_nascimento,
  email,
  habilitado,
  id,
});

module.exports = { serialize };
