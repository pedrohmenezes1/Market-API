const serialize = ({ id, nome, cnpj, atividades, endereco }) => ({
  id,
  nome,
  cnpj,
  atividades,
  endereco,
});

module.exports = { serialize };
