const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.3',
  info: {
    title: 'compassolisa-project-final',
    description: 'Projeto desenvolvido para o programa de bolsas da compasso uol',
    contact: {
      name: 'Pedro Henrique',
      email: 'pedro.mk.13@hotmail.com',
      url: 'https://github.com/pedrohmenezes1',
    },
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/pedrohmenezes1/Market-API/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}api//v1`,
    },
  ],
};

module.exports = swaggerDef;
