const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const passport = require('passport');
const { jwtStrategy } = require('./config/passport');
const config = require('./config/config');
const { authLimiter } = require('./middlewares/rateLimiter');
const morgan = require('./config/morgan');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const MarketError = require('./utils/MarketError');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// Segurança HTTP headers
app.use(helmet());

// Outros middlewares

//  Analisa as solicitações recebidas com cargas JSON
app.use(express.json());

// Analisa as solicitações recebidas com cargas urlencoded
app.use(express.urlencoded({ extended: true }));

// Segurança, evita ataques XSS
app.use(xss());

// Segurança, Defesa contra ataques de injeção de seletor de consulta
app.use(mongoSanitize());

// Compactação gzip ou deflate
app.use(compression());

// Ajuda a acessar várias funcionalidades no navegador
app.use(cors());
app.options('*', cors());

// Autenticações
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// Limita as tentantivas de logins com senha ou email incorretos :)
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// Routes
app.use('/api/v1', routes);

// envia de volta um erro 404 para qualquer solicitação de API desconhecida
app.use((req, res, next) => {
  next(new MarketError(httpStatus.NOT_FOUND, 'Not found'));
});

// converter erro para MarketError, se necessário
app.use(errorConverter);

// lidar com erro
app.use(errorHandler);

module.exports = app;
