const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account_match', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    liked_by_startup: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    id_startup: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'startup',
        key: 'id'
      }
    },
    id_student: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'student',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'account_match',
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
        name: "account_match_startup_FK",
        using: "BTREE",
        fields: [
          { name: "id_startup" },
        ]
      },
      {
        name: "account_match_student0_FK",
        using: "BTREE",
        fields: [
          { name: "id_student" },
        ]
      },
    ]
  });
};
