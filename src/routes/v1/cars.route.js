const express = require('express');
const validate = require('../../middlewares/validate');
const carsValidation = require('../../validations/cars.validation');
const carsController = require('../../controllers/cars.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(carsValidation.createCars), carsController.createCars)
  .get(validate(carsValidation.getCars), carsController.getCars);

router
  .route('/:carsId')
  .delete(validate(carsValidation.deleteCars), carsController.deleteCars)
  .patch(validate(carsValidation.updateCars), carsController.updateCars)
  .get(validate(carsValidation.getCars), carsController.getCarsId);
module.exports = router;
