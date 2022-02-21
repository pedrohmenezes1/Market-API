const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');
const { Token } = require('../models');
const { tokenTypes } = require('../config/tokens');

/**
 * Generate token
 * @param {ObjectId} peopleId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (peopleId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: peopleId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Salvar um token
 * @param {string} token
 * @param {ObjectId} peopleId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (token, peopleId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    people: peopleId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

/**
 * Verifique o token e retorna o documento do token (ou lance um erro se não for válido)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({ token, type, people: payload.sub, blacklisted: false });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

/**
 * Gerar tokens de autenticação
 * @param {People} people
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (people) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(people.id, accessTokenExpires, tokenTypes.ACCESS);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
  };
};

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
};
