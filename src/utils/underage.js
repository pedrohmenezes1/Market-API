/**
 * Verifica se a pessoa é menor de idade
 * @param {Object} birth
 * @returns {Promise<People>}
 */
function underage(birth) {
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  return birth <= eighteenYearsAgo;
}
module.exports = {
  underage,
};
