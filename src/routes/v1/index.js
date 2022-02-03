const express = require('express');
const carsRoute = require('./cars.route');
const peopleRoute = require('./people.route');

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
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
