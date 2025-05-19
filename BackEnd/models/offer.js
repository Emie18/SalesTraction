const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('offer', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    product: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pitch: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    range_offer: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    commission: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    client: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    work_mode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'work_mode',
        key: 'work_mode'
      }
    },
    id_startup: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'startup',
        key: 'id'
      }
    },
    commission_offer_commission: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'commission',
        key: 'commission'
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
          { name: "work_mode" },
        ]
      },
      {
        name: "offer_startup0_FK",
        using: "BTREE",
        fields: [
          { name: "id_startup" },
        ]
      },
      {
        name: "offer_commission1_FK",
        using: "BTREE",
        fields: [
          { name: "commission_offer_commission" },
        ]
      },
    ]
  });
};
