const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('startup', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    siret: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    is_valid: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    id_account: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account',
        key: 'id'
      },
      unique: "startup_account_FK"
    }
  }, {
    sequelize,
    tableName: 'startup',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "startup_account_AK",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_account" },
        ]
      },
    ]
  });
};
