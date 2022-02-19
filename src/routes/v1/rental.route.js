const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const rentalValidation = require('../../validations/rental.validation');
const rentalController = require('../../controllers/rental.controller');

const router = express.Router();

router.route('/').post(auth, validate(rentalValidation.createRental), rentalController.createRental);
