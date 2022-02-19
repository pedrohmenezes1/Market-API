const { Rental } = require('../models');

const createRental = async (rentalBody) => {
  return Rental.create(rentalBody);
};

module.exports = {
  createRental,
};
