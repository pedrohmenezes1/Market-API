const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { rentalValidation } = require('../../validations');
const { rentalController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth, validate(rentalValidation.createRental), rentalController.createRental)
  .get(auth, validate(rentalValidation.getRental), rentalController.getRental);

router.route('/:rentalId').get(auth, validate(rentalValidation.getRentalById), rentalController.getRentalId);
module.exports = router;
