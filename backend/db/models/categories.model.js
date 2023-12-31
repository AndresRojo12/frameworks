const { Model, DataTypes, Sequelize } = require('sequelize');
const { USUARIOS_TABLE } = require('./usuarios.model');

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
    allowNull: false,
  },

  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: USUARIOS_TABLE,
      key: 'id',
    },
  },

  created_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_by: {
    type: DataTypes.INTEGER,
    references: {
      model: USUARIOS_TABLE,
      key: 'id',
    },
  },
  updated_at: {
    type: DataTypes.DATE,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  deleted_by: {
    type: DataTypes.INTEGER,
    references: {
      model: USUARIOS_TABLE,
      key: 'id',
    },
  },
  deleted_at: {
    type: DataTypes.DATE,
  },
};

class Categories extends Model {
  static associate(models) {
    this.belongsTo(models.Usuarios, {
      as: 'creator',
      foreignKey: 'created_by'
    });

    this.belongsTo(models.Usuarios, {
      as: 'updator',
      foreignKey: 'updated_by',
    });

    this.belongsTo(models.Usuarios, {
      as: 'deletor',
      foreignKey: 'deleted_by',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORIES_TABLE,
      modelName: 'Categories',
      timestamps: false,
    };
  }
}

module.exports = { Categories, categories_schema, CATEGORIES_TABLE };
