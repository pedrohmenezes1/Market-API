/* eslint-disable class-methods-use-this */
const { Cars } = require('../models');

class CarsRepository {
  async createCars(cars) {
    return Cars.create(cars);
  }

  async findCars(cars) {
    const { page = 1, limit = 100, ...query } = cars;
    return Cars.paginate(
      { ...query },
      { limit: Number(limit), page: Number(page), skip: (Number(page) - 1) * Number(limit) }
    );
  }
}
module.exports = new CarsRepository();
