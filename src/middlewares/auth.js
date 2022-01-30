const passport = require('passport');
const httpStatus = require('http-status');
const MarketError = require('../utils/MarketError');
const { roleRights } = require('../config/roles');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, people, info) => {
  if (err || info || !people) {
    return reject(new MarketError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.people = people;

  if (requiredRights.length) {
    const peopleRights = roleRights.get(people.role);
    const hasRequiredRights = requiredRights.every((requiredRight) => peopleRights.includes(requiredRight));
    if (!hasRequiredRights && req.params.peopleId !== people.id) {
      return reject(new MarketError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
