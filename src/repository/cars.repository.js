/* eslint-disable class-methods-use-this */
const carsSchema = require('../models/cars.model');

class CarsRepository {
  async create(payload) {
    return carsSchema.create(payload);
  }
}

module.exports = new CarsRepository();
