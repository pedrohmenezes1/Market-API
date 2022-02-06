const passport = require('passport');
const httpStatus = require('http-status');
const MarketError = require('../utils/MarketError');

const verifyCallback = (req, resolve, reject) => async (err, people, info) => {
  if (err || info || !people) {
    return reject(new MarketError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.people = people;

  resolve();
};

const auth = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
