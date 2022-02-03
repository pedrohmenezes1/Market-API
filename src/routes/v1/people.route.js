const express = require('express');
const validate = require('../../middlewares/validate');
const peopleValidation = require('../../validations/people.validation');
const peopleController = require('../../controllers/people.controller');

const router = express.Router();

router.route('/').post(validate(peopleValidation.createPeople), peopleController.createPeople);

module.exports = router;
