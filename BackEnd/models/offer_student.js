const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('offer_student', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'student',
        key: 'id'
      }
    },
    id_offer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'offer',
        key: 'id'
      }
    },
    state: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'offer_state',
        key: 'state'
      }
    },
    motivation: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'offer_student',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "id_offer" },
          { name: "state" },
        ]
      },
      {
        name: "offer_student_offer0_FK",
        using: "BTREE",
        fields: [
          { name: "id_offer" },
        ]
      },
      {
        name: "offer_student_offer_state1_FK",
        using: "BTREE",
        fields: [
          { name: "state" },
        ]
      },
    ]
  });
};
