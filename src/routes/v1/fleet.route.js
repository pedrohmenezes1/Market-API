const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { fleetValidation } = require('../../validations');
const { fleetController } = require('../../controllers');

const router = express.Router();

router.route('/:rentalId/car').post(auth, validate(fleetValidation.createFleet), fleetController.createFleet);

module.exports = router;
