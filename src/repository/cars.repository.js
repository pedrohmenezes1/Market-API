/* eslint-disable class-methods-use-this */
const carsSchema = require('../models/cars.model');

class CarsRepository {
  async create(payload) {
    return carsSchema.create(payload);
  }

  async patchAcessorio(_id, idAcessorio, payload) {
    const result = await carsSchema.findOneAndUpdate(
      { _id, 'acessorios._id': idAcessorio },
      {
        $set: {
          'acessorios.$.descricao': payload.descricao,
        },
      },
      { new: true, safe: true, upsert: true }
    );
    return result;
  }
}

module.exports = new CarsRepository();
