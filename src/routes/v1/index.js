const express = require('express');
const carsRoute = require('./cars.route');
const peopleRoute = require('./people.route');
const authRoute = require('./auth.route');
const docsRoute = require('./docs.route');
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
];

const devRoutes = [
  // routes available only in development mode
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
