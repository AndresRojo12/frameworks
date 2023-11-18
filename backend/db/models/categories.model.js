const { Model, DataTypes, Sequelize } = require('sequelize');
const CATEGORIES_TABLE = 'categories';

const categories_schema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING(120),
    unique: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(250),
    unique: true,
    allowNull: false,
  },

  // class Categories extends Model {
  //   static associate(models) {
  //      this.belongsTo(models.Categories, {
  //     //   as: 'creator',
  //     //   foreignKey: 'created_by'
  //      });

  //     // this.belongsTo(models.User, {
  //     //   as: 'updator',
  //     //   foreignKey: 'updated_by'
  //     // });

  //     // this.belongsTo(models.User, {
  //     //   as: 'deletor',
  //     //   foreignKey: 'deleted_by'
  //     // });
  //   }
  //   static config(sequelize) {
  //     return {
  //       sequelize,
  //       tableName: CATEGORIES_TABLE,
  //       modelName: 'Categorie',
  //       timestamps: false,
  //     };
  //   }
  // }
}

module.exports = { categories_schema, CATEGORIES_TABLE };
