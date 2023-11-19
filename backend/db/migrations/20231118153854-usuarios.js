'use strict';
const { usuarios_schema, USUARIOS_TABLE} = require('../models/usuarios.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USUARIOS_TABLE, usuarios_schema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USUARIOS_TABLE);
  },
};
