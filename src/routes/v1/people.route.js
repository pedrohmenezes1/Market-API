const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const peopleValidation = require('../../validations/people.validation');
const peopleController = require('../../controllers/people.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(peopleValidation.createPeople), peopleController.createPeople)
  .get(auth('getPeople'), validate(peopleValidation.getPeoples), peopleController.getPeople);

router
  .route('/:peopleId')
  .delete(auth('managePeople'), validate(peopleValidation.deletePeople), peopleController.deletePeople)
  .patch(auth('managePeople'), validate(peopleValidation.updatePeople), peopleController.updatePeople)
  .get(auth('getPeople'), validate(peopleValidation.getPeople), peopleController.getPeopleId);

module.exports = router;
