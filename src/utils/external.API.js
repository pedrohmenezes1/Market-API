const axios = require('axios');

const viaCep = async (cep) => {
  const result = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
  return result.data;
};

module.exports = {
  viaCep,
};
