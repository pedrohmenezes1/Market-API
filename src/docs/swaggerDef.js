const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '1.0.0',
  info: {
    title: 'compassolisa-project-final',
    description: 'projeto desenvolvido para o programa de bolsas da compasso uol',
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
