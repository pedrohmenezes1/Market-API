/* eslint-disable class-methods-use-this */
const { People } = require('../models');

class PeopleRepository {
  async createPeople(people) {
    return People.create(people);
  }

  /**
   * Verifica se o e-mail foi recebido
   * @param {string} email - The people's email
   * @param {ObjectId} [excludePeopleId] - The id of the people to be excluded
   * @returns {Promise<boolean>}
   */
  async isEmailTaken(email, excludePeopleId) {
    const people = await People.findOne({ email, _id: { $ne: excludePeopleId } });
    return !!people;
  }

  /**
   * Consulta para pessoas
   * @param {Object} filter - Filtro Mongo
   * @param {Object} options - Opções de consulta
   * @param {number} [options.limit] - Número máximo de resultados por página (padrão = 100)
   * @param {number} [options.offset] - Página atual (padrão = 1)
   * @returns {Promise<QueryResult>}
   */
  async findPeople(filter, options) {
    const people = await People.paginate(filter, options);
    return people;
  }

  /**
   * Consulta por id de pessoas
   * @param {ObjectId} id
   * @returns {Promise<People>}
   */
  async getPeopleId(id) {
    return People.findById(id);
  }

  /**
   * Consulta por id para pessoas
   * @param {ObjectId} id
   * @returns {Promise<People>}
   */
  async findPeopleById(id) {
    return People.findById(id);
  }

  /**
   * Atualiza pessoas por id
   * @param {ObjectId} id
   * @returns {Promise<People>}
   */
  async updatePeopleById(id) {
    return People.findById(id);
  }

  /**
   * Buscar pessoas por email
   * @param {string} email
   * @returns {Promise<People>}
   */
  async getPeopleByEmail(email) {
    return People.findOne({ email });
  }
}

module.exports = new PeopleRepository();
