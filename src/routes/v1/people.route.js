const express = require('express');
const validate = require('../../middlewares/validate');
const peopleValidation = require('../../validations/people.validation');
const peopleController = require('../../controllers/people.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(peopleValidation.createPeople), peopleController.createPeople)
  .get(validate(peopleValidation.getPeoples), peopleController.getPeople);

router
  .route('/:peopleId')
  .delete(validate(peopleValidation.deletePeople), peopleController.deletePeople)
  .patch(validate(peopleValidation.updatePeople), peopleController.updatePeople)
  .get(validate(peopleValidation.getPeople), peopleController.getPeopleId);
module.exports = router;
