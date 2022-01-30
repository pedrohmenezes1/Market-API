/* eslint-disable class-methods-use-this */
const carsSchema = require('../models/cars.model');

class CarsRepository {
  async create(payload) {
    return carsSchema.create(payload);
  }

  async find(payload) {
    const { page = 1, limit = 100, ...query } = payload;
    return carsSchema.paginate(
      { ...query },
      { limit: Number(limit), page: Number(page), skip: (Number(page) - 1) * Number(limit) }
    );
  }

  async delete(payload) {
    return carsSchema.findByIdAndRemove({ _id: payload });
  }

  async findById(payload) {
    return carsSchema.findById(payload);
  }

  async update(_id, payload) {
    return carsSchema.findOneAndUpdate({ _id }, payload, { new: true });
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
