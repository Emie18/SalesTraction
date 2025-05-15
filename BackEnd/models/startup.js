'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StartUp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StartUp.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    linkdin: DataTypes.STRING,
    siret: DataTypes.STRING,
    description: DataTypes.TEXT,
    pass: DataTypes.STRING,
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'StartUp',
  });
  return StartUp;
};