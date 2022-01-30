const express = require('express');
const carsRoute = require('./cars.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/car',
    route: carsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
