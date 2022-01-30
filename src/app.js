const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const MarketError = require('./utils/MarketError');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// segurança HTTP headers
app.use(helmet());

// Outros middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(mongoSanitize());
app.use(compression());
app.use(cors());
app.options('*', cors());

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
