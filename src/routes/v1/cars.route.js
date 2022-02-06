const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const carsValidation = require('../../validations/cars.validation');
const carsController = require('../../controllers/cars.controller');

const router = express.Router();

router
  .route('/')
  .post(auth, validate(carsValidation.createCars), carsController.createCars)
  .get(auth, validate(carsValidation.getCars), carsController.getCars);

router
  .route('/:carsId')
  .delete(auth, validate(carsValidation.deleteCars), carsController.deleteCars)
  .patch(auth, validate(carsValidation.updateCars), carsController.updateCars)
  .get(auth, validate(carsValidation.getCars), carsController.getCarsId);
module.exports = router;
