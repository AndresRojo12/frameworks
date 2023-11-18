const { Categories, categories_schema } = require('./categories.model');

function setupModels(sequelize) {
  Categories.init(categories_schema, Categories.config(sequelize));

}
module.exports = setupModels;
