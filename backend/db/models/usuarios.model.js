const { Model, DataTypes, Sequelize } = require('sequelize');
const USUARIOS_TABLE = 'users';

const usuarios_schema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },

  created_by: {
    type: DataTypes.INTEGER,
    references: {
      model: USUARIOS_TABLE,
      key: 'id'
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_by: {
    type: DataTypes.INTEGER,
    references: {
      model: USUARIOS_TABLE,
      key: 'id'
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
      key: 'id'
    },
  },
  deleted_at: {
    type: DataTypes.DATE,
  },
};

class Usuarios extends Model {
  static associate(models) {
    this.belongsTo(models.Usuarios, {
      as: 'creator',
      foreignKey: 'created_by'
    });

    this.belongsTo(models.Usuarios, {
      as: 'updator',
      foreignKey: 'updated_by'
    });

    this.belongsTo(models.Usuarios, {
      as: 'deletor',
      foreignKey: 'deleted_by'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USUARIOS_TABLE,
      modelName: 'Usuarios',
      timestamps: false,
    };
  }
}

module.exports = { Usuarios, usuarios_schema, USUARIOS_TABLE };
