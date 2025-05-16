const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('offer', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    produit: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pitch: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    gamme: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    commision: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    client: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nom_work_mode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'work_mode',
        key: 'nom'
      }
    },
    id_startup: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'startup',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'offer',
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
        name: "offer_work_mode_FK",
        using: "BTREE",
        fields: [
          { name: "nom_work_mode" },
        ]
      },
      {
        name: "offer_startup0_FK",
        using: "BTREE",
        fields: [
          { name: "id_startup" },
        ]
      },
    ]
  });
};
