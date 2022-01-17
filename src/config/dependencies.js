const useCases = require('../useCases');
const repositories = require('../frameworks/repositories/inMemory');

module.exports = {
  useCases,
  ...repositories
}