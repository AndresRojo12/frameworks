const { Categories, categories_schema } = require('./categories.model');
const { Usuarios, usuarios_schema } = require('./usuarios.model');

function setupModels(sequelize) {
  Usuarios.init(usuarios_schema, Usuarios.config(sequelize));
  Usuarios.associate(sequelize.models); // Corregido: Pasar sequelize.models
  Categories.init(categories_schema, Categories.config(sequelize));
  Categories.associate(sequelize.models); // Corregido: Pasar sequelize.models
}

module.exports = setupModels;
