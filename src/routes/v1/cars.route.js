const express = require('express');
const validate = require('../../middlewares/validate');
const carsValidation = require('../../validations/cars.validation');
const carsController = require('../../controllers/cars.controller');

const router = express.Router();

router.route('/').post(validate(carsValidation.createCars), carsController.createCars);

module.exports = router;
