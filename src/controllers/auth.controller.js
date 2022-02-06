const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const MarketError = require('../utils/MarketError');
const catchAsync = require('../utils/catchAsync');
const { authService, tokenService } = require('../services');

const authenticate = catchAsync(async (req, res) => {
  const { email, senha } = req.body;
  const people = await authService.authenticate({ email });
  if (!people) {
    throw new MarketError(httpStatus.UNAUTHORIZED, 'Email incorreto');
  }
  if (!(await bcrypt.compare(senha, people.senha))) {
    throw new MarketError(httpStatus.UNAUTHORIZED, 'Senha incorreta');
  }
  people.senha = undefined;
  const tokens = await tokenService.generateAuthTokens(people);
  req.headers.authorization = `Bearer ${tokens}`;
  res.status(httpStatus.CREATED).json({ email, tokens });
});

module.exports = {
  authenticate,
};
