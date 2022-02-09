const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const peopleValidation = require('../../validations/people.validation');
const peopleController = require('../../controllers/people.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(peopleValidation.createPeople), peopleController.createPeople)
  .get(auth, validate(peopleValidation.getPeoples), peopleController.getPeople);

router
  .route('/:peopleId')
  .delete(auth, validate(peopleValidation.deletePeople), peopleController.deletePeople)
  .put(auth, validate(peopleValidation.updatePeople), peopleController.updatePeople)
  .get(auth, validate(peopleValidation.getPeople), peopleController.getPeopleId);

module.exports = router;
