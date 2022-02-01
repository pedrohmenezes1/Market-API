const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]$/)) {
    return helpers.message('"{{#label}}" deve ser um ID de carro válido');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 6) {
    return helpers.message('A senha deve conter pelo menos 6 caracteres');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('A senha deve conter pelo menos 1 letra e 1 número');
  }
  return value;
};

module.exports = {
  objectId,
  password,
};
