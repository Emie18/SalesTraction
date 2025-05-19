const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account_sector', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'account',
        key: 'id'
      }
    },
    sector: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'sector',
        key: 'sector'
      }
    }
  }, {
    sequelize,
    tableName: 'account_sector',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "sector" },
        ]
      },
      {
        name: "account_sector_sector0_FK",
        using: "BTREE",
        fields: [
          { name: "sector" },
        ]
      },
    ]
  });
};
