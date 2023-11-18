'use strict';
const { categories_schema, CATEGORIES_TABLE} = require('../models/categories.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(CATEGORIES_TABLE, categories_schema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(CATEGORIES_TABLE);
  },
};
