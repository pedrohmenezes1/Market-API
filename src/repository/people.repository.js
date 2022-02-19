/* eslint-disable class-methods-use-this */
const { People } = require('../models');

/**
 * Cadastrar uma pessoa
 * @param {Object} carBody
 * @returns {Promise<CarsRepository>}
 */
const createPeople = async (peopleBody) => {
  return People.create(peopleBody);
};

/**
 * Verifica se o e-mail foi recebido
 * @param {string} email - Email da pessoa
 * @param {ObjectId} [excludePeopleId] - O id das pessoas a serem excluídas
 * @returns {Promise<boolean>}
 */
const isEmailTaken = async (email, excludePeopleId) => {
  const people = await People.findOne({ email, _id: { $ne: excludePeopleId } });
  return !!people;
};

/**
 * Consulta para pessoas
 * @param {Object} filter - Filtro Mongo
 * @param {Object} options - Opções de consulta
 * @param {number} [options.limit] - Número máximo de resultados por página (padrão = 100)
 * @param {number} [options.offset] - Página atual (padrão = 1)
 * @returns {Promise<QueryResult>}
 */
const findPeople = async (filter, options) => {
  const people = await People.paginate(filter, options);
  return people;
};

/**
 * Consulta por id de pessoas
 * @param {ObjectId} id
 * @returns {Promise<People>}
 */
const getPeopleId = async (id) => {
  return People.findById(id);
};

/**
 * Buscar pessoas por email
 * @param {string} email
 * @returns {Promise<People>}
 */
const getPeopleByEmail = async (email) => {
  return People.findOne({ email });
};

module.exports = {
  createPeople,
  isEmailTaken,
  findPeople,
  getPeopleId,
  getPeopleByEmail,
};
