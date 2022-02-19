const express = require('express');
const validate = require('../../middlewares/validate');
const { authValidation } = require('../../validations');
const { authController } = require('../../controllers');

const router = express.Router();

router.post('/', validate(authValidation.authenticate), authController.authenticate);

module.exports = router;
