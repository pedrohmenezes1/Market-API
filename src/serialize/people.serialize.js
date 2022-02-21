// eslint-disable-next-line camelcase
const serialize = ({ id, nome, cpf, data_nascimento, email, habilitado }) => ({
  id,
  nome,
  cpf,
  data_nascimento,
  email,
  habilitado,
});

module.exports = { serialize };
