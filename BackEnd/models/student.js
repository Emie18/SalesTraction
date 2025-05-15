'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    toJSON() {
      const values = { ...this.get() };
      delete values.pass;
      return values;
    }

    static associate(models) {
      // define association here
    }
  }
  Student.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    linkdin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    disponibility: DataTypes.STRING,
    description: DataTypes.TEXT,
    pass: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};