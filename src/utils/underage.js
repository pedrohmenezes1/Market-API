const moment = require('moment');
const httpStatus = require('http-status');
const MarketError = require('./MarketError');

/**
 * Verifica se a pessoa é menor de idade
 * @param {Object} birth
 * @returns {Promise<People>}
 */
const underage = (birth) => {
  if (Math.floor(moment(new Date()).diff(moment(birth.data_nascimento), 'years', true)) < 18) {
    throw new MarketError(httpStatus.UNAUTHORIZED, 'Pessoa menor de idade');
  }
};
module.exports = underage;
