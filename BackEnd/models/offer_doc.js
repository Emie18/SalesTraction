const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('offer_doc', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    id_offer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'offer',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'offer_doc',
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
        name: "offer_doc_offer_FK",
        using: "BTREE",
        fields: [
          { name: "id_offer" },
        ]
      },
    ]
  });
};
