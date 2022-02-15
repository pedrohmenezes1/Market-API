const moment = require('moment');
const config = require('../../src/config/config');
const { tokenTypes } = require('../../src/config/tokens');
const tokenService = require('../../src/services/token.service');
const { peopleOne, peopleTwo } = require('./people.fixture');

const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
const peopleOneAccessToken = tokenService.generateToken(peopleOne._id, accessTokenExpires, tokenTypes.ACCESS);
const peopleTwoAccessToken = tokenService.generateToken(peopleTwo._id, accessTokenExpires, tokenTypes.ACCESS);

module.exports = {
  peopleOneAccessToken,
  peopleTwoAccessToken,
};
