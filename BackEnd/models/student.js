const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    surname: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    disponibility: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    school: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'school',
        key: 'school'
      }
    },
    id_account: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account',
        key: 'id'
      },
      unique: "student_account0_FK"
    }
  }, {
    sequelize,
    tableName: 'student',
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
        name: "student_account_AK",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_account" },
        ]
      },
      {
        name: "student_school_FK",
        using: "BTREE",
        fields: [
          { name: "school" },
        ]
      },
    ]
  });
};
