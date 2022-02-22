const express = require('express');
const carsRoute = require('./cars.route');
const peopleRoute = require('./people.route');
const fleetRoute = require('./fleet.route');
const authRoute = require('./auth.route');
const docsRoute = require('./docs.route');
const rentalRoute = require('./rental.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/car',
    route: carsRoute,
  },
  {
    path: '/people',
    route: peopleRoute,
  },
  {
    path: '/authenticate',
    route: authRoute,
  },
  {
    path: '/rental',
    route: rentalRoute,
  },
  {
    path: '/rental',
    route: fleetRoute,
  },
];

const devRoutes = [
  // rotas disponíveis apenas no modo de desenvolvimento
  {
    path: '/docs',
    route: docsRoute,
  },
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
