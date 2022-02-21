/* eslint-disable no-param-reassign */

const paginate = (schema) => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Resultados encontrados
   * @property {number} offset - Pagina atual
   * @property {number} limit - Número máximo de resultados por página
   * @property {number} total - Número total de páginas
   * @property {number} offsets - Número total de documentos
   */
  /**
   * Consulta de documentos com paginação
   * @param {Object} [filter] - Filtro Mongo
   * @param {Object} [options] - Opções de consulta
   * @param {string} [options.populate] - Preencha os campos de dados. A hierarquia dos campos deve ser separada por (.). Vários critérios de preenchimento devem ser separados por vírgulas (,)
   * @param {number} [options.limit] - Número máximo de resultados por página (padrão = 100)
   * @param {number} [options.offset] - Página atual (padrão = 1)
   * @returns {Promise<QueryResult>}
   */
  schema.statics.paginate = async function (filter, options) {
    const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 100;
    const offset = options.offset && parseInt(options.offset, 10) > 0 ? parseInt(options.offset, 10) : 1;
    const skip = (offset - 1) * limit;

    const countPromise = this.countDocuments(filter).exec();
    let docsPromise = this.find(filter).skip(skip).limit(limit);

    if (options.populate) {
      options.populate.split(',').forEach((populateOption) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a }))
        );
      });
    }

    docsPromise = docsPromise.exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [offsets, results] = values;
      const total = Math.ceil(offsets / limit);
      const result = {
        results,
        total,
        limit,
        offset,
        offsets,
      };
      return Promise.resolve(result);
    });
  };
};

module.exports = paginate;
