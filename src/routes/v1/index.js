const express = require('express');
const carsRoute = require('./cars.router');
const peopleRoute = require('./people.router');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/cars',
    router: carsRoute,
  },
  {
    path: '/people',
    router: peopleRoute,
  },
];

const devRoutes = [
  // Rotas disponíveis apenas no modo de desenvolvimento
  {},
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
