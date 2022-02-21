const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { carsValidation } = require('../../validations');
const { carsController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth, validate(carsValidation.createCars), carsController.createCars)
  .get(auth, validate(carsValidation.getCars), carsController.getCars);

router
  .route('/:carsId')
  .delete(auth, validate(carsValidation.deleteCars), carsController.deleteCars)
  .put(auth, validate(carsValidation.updateCars), carsController.updateCars)
  .get(auth, validate(carsValidation.getCars), carsController.getCarsId);
router
  .route('/:carsId/acessorios/:accessoryId')
  .patch(auth, validate(carsValidation.updateAccessory), carsController.updateAccessory);

module.exports = router;
